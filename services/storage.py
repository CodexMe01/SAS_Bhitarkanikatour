from flask import current_app
import os
import secrets

from werkzeug.utils import secure_filename

def save_id_proof(file):
    """Save the uploaded ID proof securely."""
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        unique_filename = f"id_proof_{secrets.token_hex(8)}{os.path.splitext(filename)[1]}"
        
        # Ensure upload directory exists
        upload_dir = current_app.config['UPLOAD_FOLDER']
        os.makedirs(upload_dir, exist_ok=True)
        
        file_path = os.path.join(upload_dir, unique_filename)
        file.save(file_path)
        return unique_filename
    return None

def allowed_file(filename):
    """Check if the uploaded file is allowed."""
    allowed_extensions = {'jpg', 'jpeg', 'png', 'gif', 'pdf'}
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in allowed_extensions