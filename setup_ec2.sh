#!/bin/bash

# EC2 Setup Script for SAS Bhitarkanika Tour
# This script installs dependencies, sets up Gunicorn, and configures Nginx.
# Run this script with sudo: sudo bash setup_ec2.sh

set -e  # Exit on error

APP_DIR="/home/ubuntu/SAS_Bhitarkanikatour"
USER="ubuntu"
VENV_DIR="$APP_DIR/venv"
DOMAIN="stayandsailbhitarkanika.in"

echo "--- Starting EC2 Setup ---"

# 1. Update System
echo "--- Updating System ---"
apt-get update
apt-get upgrade -y

# 2. Install Dependencies
echo "--- Installing Dependencies ---"
apt-get install -y python3-pip python3-venv nginx certbot python3-certbot-nginx

# 3. Setup Virtual Environment
echo "--- Setting up Virtual Environment ---"
if [ ! -d "$VENV_DIR" ]; then
    python3 -m venv $VENV_DIR
    echo "Virtual environment created."
fi

source $VENV_DIR/bin/activate
pip install --upgrade pip
if [ -f "$APP_DIR/requirements.txt" ]; then
    pip install -r $APP_DIR/requirements.txt
else
    echo "WARNING: requirements.txt not found!"
fi

# 4. Create Systemd Service
echo "--- Configuring Gunicorn Service ---"
cat > /etc/systemd/system/sas_tour.service <<EOF
[Unit]
Description=Gunicorn instance to serve SAS Bhitarkanika Tour
After=network.target

[Service]
User=$USER
Group=www-data
WorkingDirectory=$APP_DIR
Environment="PATH=$VENV_DIR/bin"
ExecStart=$VENV_DIR/bin/gunicorn --config gunicorn_config.py app:app

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl start sas_tour
systemctl enable sas_tour

# 5. Configure Nginx
echo "--- Configuring Nginx ---"
cat > /etc/nginx/sites-available/sas_tour <<EOF
server {
    listen 80;
    server_name $DOMAIN;

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOF

# Enable Nginx Site
ln -sf /etc/nginx/sites-available/sas_tour /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl restart nginx

echo "--- Setup Complete! ---"
echo "IMPORTANT: Update the DOMAIN variable in this script or Nginx config manually."
echo "Don't forget to configure your .env file in $APP_DIR"
