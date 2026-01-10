# Deployment Guide: AWS EC2

This guide covers deploying the SAS Bhitarkanika Tour application to an AWS EC2 instance (Ubuntu).

## Prerequisites

- AWS Account
- Domain name (e.g., from Godaddy, Namecheap, etc.)
- Razorpay account (for payments)

## Step 1: Launch EC2 Instance

1.  **Login to AWS Console** and navigate to **EC2**.
2.  **Launch Instance**:
    -   **Name**: SAS-Tour-Server
    -   **AMI**: Ubuntu Server 22.04 LTS (HVM) or 24.04 LTS
    -   **Instance Type**: t2.micro (Free Tier eligible) or t3.small
    -   **Key Pair**: Create a new key pair (e.g., `sas-tour-key.pem`) and download it.
    -   **Network Settings**:
        -   Create Security Group allowing:
            -   SSH (Port 22) - RESTRICT TO YOUR IP for security.
            -   HTTP (Port 80) - Anywhere
            -   HTTPS (Port 443) - Anywhere
3.  **Launch** the instance.

## Step 2: Configure Elastic IP (Optional but Recommended)

1.  Go to **Elastic IPs** in EC2 sidebar.
2.  **Allocate Elastic IP**.
3.  **Associate Elastic IP** with your running instance.
    *This ensures your IP doesn't change if you restart the server.*

## Step 3: Connect to Instance

Open your terminal (PowerShell or Git Bash) and run:

```bash
# Set permissions for key (if on Linux/Mac/Git Bash)
chmod 400 "path/to/sas-tour-key.pem"

# Connect
ssh -i "path/to/sas-tour-key.pem" ubuntu@<YOUR-EC2-PUBLIC-IP>
```

## Step 4: Server Setup & Deployment

1.  **Clone the Repository**:
    ```bash
    git clone <YOUR_GITHUB_REPO_URL>
    cd SAS_Bhitarkanikatour
    ```
    *(Note: You might need to generate an SSH key on the server and add it to GitHub if using a private repo)*

2.  **Create .env File**:
    ```bash
    cp env.example .env
    nano .env
    ```
    *Fill in your RAZORPAY keys, SECRET_KEY, and setting `FLASK_ENV=production`.*

3.  **Run Setup Script**:
    We have prepared an automated script to install dependencies and configure the server.
    ```bash
    sudo bash setup_ec2.sh
    ```
    *This script will installing Python, Nginx, setup the virtual environment, and configure the Gunicorn service.*

4.  **Verify Nginx Status**:
    ```bash
    sudo systemctl status nginx
    ```

## Step 5: SSL Setup (HTTPS)

Currently, the setup runs on HTTP. To enable HTTPS:

1.  **Point your Domain** to the EC2 Public IP using an A Record in your DNS provider.
2.  **Run Certbot**:
    ```bash
    sudo certbot --nginx -d your-domain.com
    ```
3.  **Follow prompts** to redirect HTTP to HTTPS.

## Troubleshooting

- **Check Logs**:
    ```bash
    # Application Logs
    journalctl -u sas_tour -f
    
    # Nginx Logs
    sudo tail -f /var/log/nginx/error.log
    ```
- **Restart App**:
    ```bash
    sudo systemctl restart sas_tour
    ```

## Environment Variables Reference

| Variable | Description |
|----------|-------------|
| `FLASK_ENV` | Set to `production` |
| `SECRET_KEY` | Random string for session security |
| `RAZORPAY_KEY_ID` | From Razorpay Dashboard |
| `RAZORPAY_KEY_SECRET` | From Razorpay Dashboard |
| `ADMIN_USERNAME` | Admin panel login |
| `ADMIN_PASSWORD` | Admin panel password |
| `BASE_URL` | `https://your-domain.com` |