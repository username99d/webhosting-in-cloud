# CSIT Web App

A comprehensive web portal designed for CSIT students in Nepal. This platform provides access to semester-wise study materials, lecture notes, YouTube video recommendations, and subject-specific resources.

## Project Overview

- **Framework**: [Next.js](https://nextjs.org)
- **Styling**: Tailwind CSS / Custom CSS
- **Deployment**: Dockerized for AWS EC2 (optimized for t3.micro)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Docker & Containerization

Build and run the application using Docker Compose:

```bash
docker-compose up -d --build
```

 The application will be available at `http://localhost:3000`.

## Deployment on AWS EC2 & Domain Setup

This guide covers deployment on **Amazon Linux 2023** and **Ubuntu**, including setting up a custom domain.

### 1. Launch an Instance
- **OS**: Amazon Linux 2023 (recommended) or Ubuntu Server.
- **Instance Type**: `t3.micro` (Free Tier eligible, capable of handling high load with this app).
- **Security Group (Firewall)**:
  - **Inbound Rules**:
    - **Type**: HTTP | **Port**: 80 | **Source**: 0.0.0.0/0 (Crucial for Domain Access)
    - **Type**: SSH | **Port**: 22 | **Source**: 0.0.0.0/0 (or your IP)

### 2. Install Docker
Connect to your instance via SSH: `ssh -i <your-key.pem> ec2-user@<public-ip>`

#### For Amazon Linux 2023:
```bash
sudo yum update -y
sudo yum install -y docker git
sudo service docker start
sudo usermod -a -G docker ec2-user
# Install Docker Compose V2
sudo mkdir -p /usr/local/lib/docker/cli-plugins
sudo curl -SL https://github.com/docker/compose/releases/latest/download/docker-compose-linux-x86_64 -o /usr/local/lib/docker/cli-plugins/docker-compose
sudo chmod +x /usr/local/lib/docker/cli-plugins/docker-compose
# Log out and back in
exit
```

#### For Ubuntu:
```bash
sudo apt-get update
sudo apt-get install -y docker.io docker-compose git
sudo usermod -aG docker $USER
exit
```

### 3. Deploy Application (Production)

1.  **Clone the Repository**:
    ```bash
    git clone <YOUR_REPO_URL>
    cd webhosting-in-cloud
    ```

2.  **Start for Production (Port 80)**:
    We use the production compose file to run on Port 80, so users don't need to type `:3000`.
    ```bash
    # Run using the production config
    docker compose -f docker-compose.prod.yml up -d --build
    ```
    *Note: If `docker compose` command is not found, try `docker-compose`.*

### 4. Connect Your Domain

1.  **Get your EC2 Public IP**:
    - Go to AWS Console > EC2 > Instances.
    - Copy the **Public IPv4 address** (e.g., `54.123.45.67`).
    - *Tip: Allocate an Elastic IP in AWS to keep this IP static if you restart the instance.*

2.  **Configure DNS (GoDaddy, Namecheap, etc.)**:
    - Go to your domain's DNS Management page.
    - Add an **A Record**:
        - **Type**: A
        - **Host/Name**: @ (or `www`)
        - **Value/Target**: `<YOUR_EC2_PUBLIC_IP>`
        - **TTL**: Automatic or 3600

3.  **Wait**: DNS changes can take a few minutes to an hour.

### 5. Access the App
Open your browser and type your domain name:
`http://your-domain.com`

(It should load immediately without any port number).
 