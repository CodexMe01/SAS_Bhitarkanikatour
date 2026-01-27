from datetime import datetime, date, timedelta
import os
import json
import secrets
import sqlite3
from flask import Flask, render_template, request, jsonify, send_file, redirect, url_for, abort, send_from_directory
import razorpay

from config import Dev
from services.storage import save_id_proof
from services.pdf_ticket import generate_ticket_pdf

app = Flask(__name__, instance_relative_config=True)
app.config.from_object(Dev)

os.makedirs(app.instance_path, exist_ok=True)
DB_PATH = os.path.join(app.instance_path, 'boating.db')
SLOTS_PATH = os.path.join('data', 'slots.json')

rzp = razorpay.Client(auth=(app.config['RAZORPAY_KEY_ID'], app.config['RAZORPAY_KEY_SECRET']))

# --- db setup ---

def init_db():
    with sqlite3.connect(DB_PATH) as con:
        cur = con.cursor()
        cur.execute("""
        CREATE TABLE IF NOT EXISTS bookings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            booking_id TEXT UNIQUE,
            customer_name TEXT,
            email TEXT,
            phone TEXT,
            address TEXT,
            id_type TEXT,
            id_path TEXT,
            trip_date TEXT,
            trip_time TEXT,
            persons INTEGER,
            children_under3 INTEGER,
            route TEXT,
            amount INTEGER,
            payment_id TEXT,
            ticket_path TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        """)
        con.commit()

init_db()

# --- helpers ---

def read_slots():
    # Get default times from defaults file
    defaults_file = os.path.join('data', 'defaults.json')
    if os.path.exists(defaults_file):
        with open(defaults_file, 'r') as f:
            data = json.load(f)
            default_times = data.get("defaults", ["07:00", "13:30"])
    else:
        default_times = ["07:00", "13:30"]
    
    if not os.path.exists(SLOTS_PATH):
        # Initialize with default slots for next 30 days
        default_slots = {}
        today = date.today()
        for i in range(30):
            current_date = today + timedelta(days=i)
            date_str = current_date.strftime('%Y-%m-%d')
            default_slots[date_str] = default_times.copy()
        write_slots(default_slots)
        return default_slots
    
    # Load existing slots and ensure all future dates have defaults
    with open(SLOTS_PATH, 'r') as f:
        slots = json.load(f)
    
    # Add default times to any missing future dates
    today = date.today()
    updated = False
    for i in range(30):
        current_date = today + timedelta(days=i)
        date_str = current_date.strftime('%Y-%m-%d')
        if date_str not in slots:
            slots[date_str] = default_times.copy()
            updated = True
    
    if updated:
        write_slots(slots)
    
    return slots

def write_slots(data):
    os.makedirs(os.path.dirname(SLOTS_PATH), exist_ok=True)
    with open(SLOTS_PATH, 'w') as f:
        json.dump(data, f, indent=2)

def format_time_12h(time_24h):
    """Convert 24-hour time to 12-hour AM/PM format"""
    try:
        hour, minute = time_24h.split(':')
        hour = int(hour)
        minute = int(minute)
        
        if hour == 0:
            return f"12:{minute:02d} AM"
        elif hour < 12:
            return f"{hour}:{minute:02d} AM"
        elif hour == 12:
            return f"12:{minute:02d} PM"
        else:
            return f"{hour-12}:{minute:02d} PM"
    except:
        return time_24h

# --- routes ---

@app.get('/')
def index():
    try:
        # Use absolute path to avoid CWD confusion
        dist_dir = os.path.join(app.root_path, 'static', 'dist')
        return send_from_directory(dist_dir, 'index.html')
    except Exception as e:
        app.logger.error(f"Error serving index: {e}")
        return f"Error loading frontend: {e}", 500

@app.get('/api/slots')
def api_slots():
    date = request.args.get('date')
    all_slots = read_slots()
    if date:
        available_slots = all_slots.get(date, [])
        # Format times to 12-hour AM/PM
        formatted_times = [format_time_12h(time) for time in available_slots]
        return jsonify({"available": formatted_times})
    return jsonify({"all": all_slots})

@app.get('/customer')
def customer_info():
    date = request.args.get('date')
    time = request.args.get('time')
    persons = int(request.args.get('persons', 1))
    children = int(request.args.get('children_under3', 0))
    route = request.args.get('route')
    if not all([date, time, route]):
        abort(400)
    return render_template('customer.html', date=date, time=time, persons=persons, children_under3=children, route=route)

@app.post('/pay')
def start_payment():
    try:
        form = request.form
        files = request.files

        # Validate required fields
        required_fields = ['date', 'time', 'route', 'persons', 'name', 'phone', 'email', 'address', 'id_type']
        for field in required_fields:
            if not form.get(field):
                return jsonify({"error": f"Missing required field: {field}"}), 400

        # Save ID proof securely
        id_file = files.get('id_file')
        if not id_file or id_file.filename == '':
            return jsonify({"error": "ID proof file is required"}), 400
            
        try:
            id_path = save_id_proof(id_file)
        except Exception as e:
            return jsonify({"error": f"Failed to save ID proof: {str(e)}"}), 500

        # Compute amount based on route (per boat pricing)
        try:
            persons = int(form['persons'])
            children = int(form.get('children_under3', 0) or 0)
        except (ValueError, TypeError):
             return jsonify({"error": "Invalid number for persons or children"}), 400
             
        route = form['route']
        
        # Validate maximum capacity (18 people excluding children under 3)
        if persons > 18:
            return jsonify({"error": "Maximum capacity is 18 people per boat (excluding children under 3 years old)"}), 400
        
        # Route-based pricing per boat
        if "From Khola To Dangmal" in route:
            BOAT_PRICE = 3500  # INR
        elif "From Jayanagar To Dangmal" in route:
            BOAT_PRICE = 4000  # INR
        else:
            return jsonify({"error": "Invalid route selected"}), 400
        
        amount = BOAT_PRICE * 100  # in paise

        # Create a booking token (pre-payment)
        booking_token = secrets.token_urlsafe(16)

        # Create Razorpay order
        try:
            order = rzp.order.create({
                'amount': amount,
                'currency': 'INR',
                'payment_capture': 1
            })
        except Exception as e:
            return jsonify({"error": f"Failed to create payment order: {str(e)}"}), 500

        # temp store booking draft in server-side session-like cache (sqlite not needed yet)
        app.config.setdefault('DRAFTS', {})
        app.config['DRAFTS'][booking_token] = {
            'date': form['date'], 'time': form['time'], 'route': form['route'],
            'persons': persons, 'children_under3': children,
            'name': form['name'], 'phone': form['phone'], 'email': form['email'], 'address': form['address'],
            'id_type': form['id_type'], 'id_path': id_path,
            'amount': amount, 'order_id': order['id']
        }

        return render_template('pay.html',
            key_id=app.config['RAZORPAY_KEY_ID'],
            order_id=order['id'], amount=amount,
            name=form['name'], email=form['email'], phone=form['phone'],
            persons=persons, booking_token=booking_token)

    except Exception as e:
        # Catch any unexpected errors (KeyError, database, etc.)
        app.logger.error(f"Error in /pay: {str(e)}")
        return jsonify({"error": f"Internal Server Error: {str(e)}"}), 500



@app.post('/pay_later')
def pay_later():
    try:
        form = request.form
        files = request.files

        # Validate required fields
        required_fields = ['date', 'time', 'route', 'persons', 'name', 'phone', 'email', 'address', 'id_type']
        for field in required_fields:
            if not form.get(field):
                return jsonify({"error": f"Missing required field: {field}"}), 400

        # Save ID proof securely
        id_file = files.get('id_file')
        if not id_file or id_file.filename == '':
            return jsonify({"error": "ID proof file is required"}), 400
            
        try:
            id_path = save_id_proof(id_file)
        except Exception as e:
            return jsonify({"error": f"Failed to save ID proof: {str(e)}"}), 500

        # Compute amount based on route
        try:
            persons = int(form['persons'])
            children = int(form.get('children_under3', 0) or 0)
        except (ValueError, TypeError):
             return jsonify({"error": "Invalid number for persons or children"}), 400
             
        route = form['route']
        if "From Khola To Dangmal" in route:
            BOAT_PRICE = 3500
        elif "From Jayanagar To Dangmal" in route:
            BOAT_PRICE = 4000
        else:
            return jsonify({"error": "Invalid route selected"}), 400
        
        amount = BOAT_PRICE * 100  # in paise
        
        # Validate capacity
        if persons > 18:
            return jsonify({"error": "Maximum capacity is 18 people per boat"}), 400

        # Persist booking immediately
        booking_id = f"B{secrets.token_hex(5).upper()}"
        now = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        payment_id = "PAY_LATER"
        
        try:
            with sqlite3.connect(DB_PATH) as con:
                cur = con.cursor()
                cur.execute('''INSERT INTO bookings (booking_id, customer_name, email, phone, address, id_type, id_path,
                    trip_date, trip_time, route, persons, children_under3, amount, payment_id, created_at)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)''', (
                    booking_id, form['name'], form['email'], form['phone'], form['address'], 
                    form['id_type'], id_path, form['date'], form['time'], form['route'], 
                    persons, children, amount, payment_id, now))
                con.commit()
        except Exception as e:
            print(f"Database error: {e}")
            return jsonify({"error": "Failed to save booking"}), 500

        # Generate ticket
        try:
            tickets_dir = os.path.join(app.instance_path, 'tickets')
            os.makedirs(tickets_dir, exist_ok=True)
            ticket_path = os.path.join(tickets_dir, f"{booking_id}.pdf")
            
            booking_details = {
                'name': form['name'], 'email': form['email'], 'phone': form['phone'], 'address': form['address'],
                'date': form['date'], 'time': form['time'], 'route': form['route'],
                'persons': persons, 'children_under3': children, 'amount': amount,
                'payment_id': payment_id
            }
            generate_ticket_pdf(ticket_path, booking_id, booking_details)

            with sqlite3.connect(DB_PATH) as con:
                cur = con.cursor()
                cur.execute('UPDATE bookings SET ticket_path = ? WHERE booking_id = ?', (ticket_path, booking_id))
                con.commit()
        except Exception as e:
            print(f"Ticket generation error: {e}")

        return jsonify({"success": True, "booking_id": booking_id})

    except Exception as e:
        app.logger.error(f"Error in /pay_later: {str(e)}")
        return jsonify({"error": f"Internal Server Error: {str(e)}"}), 500


@app.post('/verify_payment')
def verify_payment():
    try:
        data = request.get_json() or {}
        order_id = data.get('razorpay_order_id')
        payment_id = data.get('razorpay_payment_id')
        signature = data.get('razorpay_signature')
        token = data.get('booking_token')

        if not all([order_id, payment_id, signature, token]):
            return jsonify({"error": "Missing payment verification data"}), 400

        draft = app.config.get('DRAFTS', {}).get(token)
        if not draft or draft['order_id'] != order_id:
            return jsonify({"error": "Invalid booking token or order ID"}), 400

        # verify signature
        try:
            rzp.utility.verify_payment_signature({
                'razorpay_order_id': order_id,
                'razorpay_payment_id': payment_id,
                'razorpay_signature': signature
            })
        except Exception as e:
            print(f"Payment verification error: {e}")
            return jsonify({"error": "Payment verification failed"}), 400

        # Persist booking
        booking_id = f"B{secrets.token_hex(5).upper()}"
        now = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        
        try:
            with sqlite3.connect(DB_PATH) as con:
                cur = con.cursor()
                cur.execute('''INSERT INTO bookings (booking_id, customer_name, email, phone, address, id_type, id_path,
                    trip_date, trip_time, route, persons, children_under3, amount, payment_id, created_at)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)''', (
                    booking_id, draft['name'], draft['email'], draft['phone'], draft['address'], 
                    draft['id_type'], draft['id_path'], draft['date'], draft['time'], draft['route'], 
                    draft['persons'], draft['children_under3'], draft['amount'], payment_id, now))
                con.commit()
        except Exception as e:
            print(f"Database error: {e}")
            return jsonify({"error": "Failed to save booking"}), 500

        # Generate ticket
        try:
            tickets_dir = os.path.join(app.instance_path, 'tickets')
            os.makedirs(tickets_dir, exist_ok=True)
            ticket_path = os.path.join(tickets_dir, f"{booking_id}.pdf")
            
            # Add payment_id to draft for ticket generation
            draft['payment_id'] = payment_id
            
            generate_ticket_pdf(ticket_path, booking_id, draft)

            # Update ticket path in database
            with sqlite3.connect(DB_PATH) as con:
                cur = con.cursor()
                cur.execute('UPDATE bookings SET ticket_path = ? WHERE booking_id = ?', (ticket_path, booking_id))
                con.commit()
        except Exception as e:
            print(f"Ticket generation error: {e}")
            # Don't fail the booking if ticket generation fails

        # Clean up draft
        if token in app.config.get('DRAFTS', {}):
            del app.config['DRAFTS'][token]

        return jsonify({"success": True, "booking_id": booking_id})
    except Exception as e:
        print(f"Payment verification error: {e}")
        return jsonify({"error": f"Payment verification failed: {str(e)}"}), 500

@app.get('/success')
def success():
    return send_from_directory('static/dist', 'index.html')

@app.get('/ticket/<booking_id>')
def download_ticket(booking_id):
    ticket_path = os.path.join(app.instance_path, 'tickets', f"{booking_id}.pdf")
    if not os.path.exists(ticket_path):
        abort(404)
    return send_file(ticket_path)


@app.get('/api/booking/<booking_id>')
def get_booking_details(booking_id):
    try:
        with sqlite3.connect(DB_PATH) as con:
            cur = con.cursor()
            cur.execute("SELECT booking_id, customer_name, email, phone, trip_date, trip_time, route, persons, children_under3, amount, created_at FROM bookings WHERE booking_id = ?", (booking_id,))
            booking = cur.fetchone()
            
            if booking:
                return jsonify({
                    "success": True,
                    "booking": {
                        "booking_id": booking[0],
                        "customer_name": booking[1],
                        "email": booking[2],
                        "phone": booking[3],
                        "trip_date": booking[4],
                        "trip_time": booking[5],
                        "route": booking[6],
                        "persons": booking[7],
                        "children_under3": booking[8],
                        "amount": booking[9],
                        "created_at": booking[10]
                    }
                })
            else:
                return jsonify({"success": False, "error": "Booking not found"}), 404
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

# --- Admin (simple Basic Auth) ---
from functools import wraps
from flask import Response

def require_admin(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        auth = request.authorization
        if not auth or not (auth.username == app.config['ADMIN_USERNAME'] and auth.password == app.config['ADMIN_PASSWORD']):
            return Response('Could not verify!', 401, {'WWW-Authenticate': 'Basic realm="Login required"'})
        return f(*args, **kwargs)
    return wrapper

@app.get('/admin')
@require_admin
def admin_page():
    return render_template('admin.html', title='Admin Panel')

@app.post('/admin/slots')
@require_admin
def admin_save_slots():
    slots_data = request.json
    write_slots(slots_data)
    return jsonify({"success": True})

@app.get('/admin/bookings')
@require_admin
def admin_bookings():
    try:
        with sqlite3.connect(DB_PATH) as con:
            cur = con.cursor()
            cur.execute("SELECT booking_id, customer_name, email, phone, trip_date, trip_time, route, persons, children_under3, amount, created_at, id_path, payment_id FROM bookings ORDER BY created_at DESC")
            bookings = cur.fetchall()
        return jsonify({"bookings": bookings})
    except sqlite3.OperationalError as e:
        print(f"Database error: {e}")
        return jsonify({"bookings": []})

@app.put('/admin/bookings/<booking_id>')
@require_admin
def admin_update_booking(booking_id):
    try:
        data = request.json
        if not data:
            return jsonify({"error": "No data provided"}), 400
        
        # Validate required fields
        required_fields = ['customer_name', 'email', 'phone', 'trip_date', 'trip_time', 'route', 'persons', 'children_under3', 'amount']
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Missing required field: {field}"}), 400
        
        with sqlite3.connect(DB_PATH) as con:
            cur = con.cursor()
            # Check if booking exists
            cur.execute("SELECT id FROM bookings WHERE booking_id = ?", (booking_id,))
            if not cur.fetchone():
                return jsonify({"error": "Booking not found"}), 404
            
            # Update the booking
            cur.execute("""
                UPDATE bookings SET 
                    customer_name = ?, email = ?, phone = ?, address = ?, 
                    trip_date = ?, trip_time = ?, route = ?, persons = ?, 
                    children_under3 = ?, amount = ?
                WHERE booking_id = ?
            """, (
                data['customer_name'], data['email'], data['phone'], 
                data.get('address', ''), data['trip_date'], data['trip_time'], 
                data['route'], data['persons'], data['children_under3'], 
                data['amount'], booking_id
            ))
            con.commit()
            
            # Regenerate PDF ticket with updated information
            try:
                # Get updated booking details
                cur.execute("""
                    SELECT booking_id, customer_name, email, phone, address, id_type, id_path,
                           trip_date, trip_time, route, persons, children_under3, amount, payment_id
                    FROM bookings WHERE booking_id = ?
                """, (booking_id,))
                booking_data = cur.fetchone()
                
                if booking_data:
                    # Create booking details dict for PDF generation
                    booking_details = {
                        'name': booking_data[1],
                        'email': booking_data[2],
                        'phone': booking_data[3],
                        'address': booking_data[4],
                        'id_type': booking_data[5],
                        'id_path': booking_data[6],
                        'date': booking_data[7],
                        'time': booking_data[8],
                        'route': booking_data[9],
                        'persons': booking_data[10],
                        'children_under3': booking_data[11],
                        'amount': booking_data[12]
                    }
                    
                    # Regenerate PDF
                    tickets_dir = os.path.join(app.instance_path, 'tickets')
                    os.makedirs(tickets_dir, exist_ok=True)
                    ticket_path = os.path.join(tickets_dir, f"{booking_id}.pdf")
                    generate_ticket_pdf(ticket_path, booking_id, booking_details)
                    
            except Exception as e:
                print(f"Error regenerating PDF: {e}")
                # Don't fail the update if PDF generation fails
                
        return jsonify({"success": True})
    except Exception as e:
        print(f"Error updating booking: {e}")
        return jsonify({"error": "Failed to update booking"}), 500

@app.delete('/admin/bookings/<booking_id>')
@require_admin
def admin_delete_booking(booking_id):
    try:
        with sqlite3.connect(DB_PATH) as con:
            cur = con.cursor()
            # Check if booking exists and get ID path
            cur.execute("SELECT id_path FROM bookings WHERE booking_id = ?", (booking_id,))
            result = cur.fetchone()
            if not result:
                return jsonify({"error": "Booking not found"}), 404
            
            id_path = result[0]
            
            # Delete the booking
            cur.execute("DELETE FROM bookings WHERE booking_id = ?", (booking_id,))
            con.commit()
            
            # Delete the PDF ticket if it exists
            ticket_path = os.path.join(app.instance_path, 'tickets', f"{booking_id}.pdf")
            if os.path.exists(ticket_path):
                os.remove(ticket_path)
                
            # Delete the ID proof file if it exists
            if id_path:
                full_id_path = os.path.join(app.config['UPLOAD_FOLDER'], id_path)
                if os.path.exists(full_id_path):
                    try:
                        os.remove(full_id_path)
                    except Exception as e:
                        print(f"Error deleting ID proof file: {e}")
                
        return jsonify({"success": True})
    except Exception as e:
        print(f"Error deleting booking: {e}")
        return jsonify({"error": "Failed to delete booking"}), 500

@app.get('/admin/slots')
@require_admin
def admin_get_slots():
    slots = read_slots()
    return jsonify({"slots": slots})

@app.get('/admin/defaults')
@require_admin
def admin_get_defaults():
    # Read defaults from a separate file or return hardcoded defaults
    defaults_file = os.path.join('data', 'defaults.json')
    if os.path.exists(defaults_file):
        with open(defaults_file, 'r') as f:
            data = json.load(f)
            return jsonify({"success": True, "defaults": data.get("defaults", ["07:00", "13:30"])})
    else:
        return jsonify({"success": True, "defaults": ["07:00", "13:30"]})

@app.post('/admin/defaults')
@require_admin
def admin_save_defaults():
    data = request.json
    defaults = data.get('defaults', [])
    
    # Save defaults to file
    defaults_file = os.path.join('data', 'defaults.json')
    os.makedirs(os.path.dirname(defaults_file), exist_ok=True)
    with open(defaults_file, 'w') as f:
        json.dump({"defaults": defaults}, f, indent=2)
    
    return jsonify({"success": True})

@app.get('/admin/id-proof/<booking_id>')
@require_admin
def admin_view_id_proof(booking_id):
    try:
        with sqlite3.connect(DB_PATH) as con:
            cur = con.cursor()
            cur.execute("SELECT id_path FROM bookings WHERE booking_id = ?", (booking_id,))
            result = cur.fetchone()
            
            if not result or not result[0]:
                abort(404)
            
            id_path = result[0]
            full_path = os.path.join(app.config['UPLOAD_FOLDER'], id_path)
            
            if not os.path.exists(full_path):
                abort(404)
            
            return send_file(full_path)
    except Exception as e:
        print(f"Error serving ID proof: {e}")
        abort(500)

# Catch-all route for React Router (must be last)
@app.route('/<path:path>')
def serve_react_app(path):
    # Absolute path to dist folder
    dist_dir = os.path.join(app.root_path, 'static', 'dist')
    requested_file = os.path.join(dist_dir, path)

    # 1. If file exists on disk (e.g. assets/style.css or footer_logo.png), serve it
    if os.path.exists(requested_file) and os.path.isfile(requested_file):
        return send_from_directory(dist_dir, path)
    
    # 2. Otherwise, it's a frontend route (e.g. /contact), serve index.html
    return send_from_directory(dist_dir, 'index.html')

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8080))
    app.run(host='0.0.0.0', port=port, debug=True)
