#!/bin/bash
set -e

# Update system
yum update -y
yum install -y nodejs npm git

# Set environment variables
export DB_HOST=ratemybelly-db.chi2ik0s43qe.us-east-2.rds.amazonaws.com
export DB_PORT=5432
export DB_USER=postgres
export DB_PASSWORD=Fluxbar9!
export DB_NAME=pax_cargo
export NODE_ENV=production
export CORS_ORIGIN=https://main.d3k5rru5tez6dk.amplifyapp.com
export PORT=3000

# Clone repo
cd /home/ec2-user
git clone https://github.com/hipster-amz/pax-air-cargo-api.git
cd pax-air-cargo-api

# Install dependencies and build
npm install
npm run build

# Create systemd service to keep app running
cat > /etc/systemd/system/pax-cargo-api.service << EOF
[Unit]
Description=PAX Air Cargo API
After=network.target

[Service]
Type=simple
User=ec2-user
WorkingDirectory=/home/ec2-user/pax-air-cargo-api
Environment="DB_HOST=ratemybelly-db.chi2ik0s43qe.us-east-2.rds.amazonaws.com"
Environment="DB_PORT=5432"
Environment="DB_USER=postgres"
Environment="DB_PASSWORD=Fluxbar9!"
Environment="DB_NAME=pax_cargo"
Environment="NODE_ENV=production"
Environment="CORS_ORIGIN=https://main.d3k5rru5tez6dk.amplifyapp.com"
Environment="PORT=3000"
ExecStart=/usr/bin/npm start
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF

# Start service
systemctl daemon-reload
systemctl enable pax-cargo-api
systemctl start pax-cargo-api

# Log the startup
echo "PAX Cargo API starting..." >> /var/log/pax-cargo-startup.log
