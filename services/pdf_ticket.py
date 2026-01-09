from fpdf import FPDF
import os

def generate_ticket_pdf(ticket_path, booking_id, booking_details):
    pdf = FPDF()
    pdf.add_page()

    # Set font
    pdf.set_font("Arial", size=12)

    # Title
    pdf.cell(200, 10, txt="Boat Service - Booking Confirmation", ln=True, align='C')
    pdf.ln(10)

    # Booking details
    pdf.cell(200, 10, txt=f"Booking ID: {booking_id}", ln=True)
    pdf.cell(200, 10, txt=f"Date: {booking_details['date']}", ln=True)
    pdf.cell(200, 10, txt=f"Time: {booking_details['time']}", ln=True)
    pdf.cell(200, 10, txt=f"Route: {booking_details['route']}", ln=True)
    pdf.cell(200, 10, txt=f"Number of People: {booking_details['persons']} (Max 18 per boat)", ln=True)
    pdf.cell(200, 10, txt=f"Children under 3: {booking_details['children_under3']} (Free)", ln=True)
    pdf.ln(5)
    pdf.cell(200, 10, txt="Customer Details:", ln=True)
    pdf.cell(200, 10, txt=f"Name: {booking_details['name']}", ln=True)
    pdf.cell(200, 10, txt=f"Phone: {booking_details['phone']}", ln=True)
    pdf.cell(200, 10, txt=f"Email: {booking_details['email']}", ln=True)
    pdf.cell(200, 10, txt=f"Address: {booking_details['address']}", ln=True)
    pdf.ln(5)
    
    # Pricing information
    pdf.cell(200, 10, txt="Pricing:", ln=True)
    pdf.cell(200, 10, txt=f"Boat Price: Rs. {booking_details['amount'] / 100}", ln=True)
    pdf.cell(200, 10, txt="Note: This is a per-boat booking for up to 18 people", ln=True)
    pdf.cell(200, 10, txt="(excluding children under 3 years old)", ln=True)

    # Save the PDF to a file
    os.makedirs(os.path.dirname(ticket_path), exist_ok=True)
    pdf.output(ticket_path)

    return ticket_path