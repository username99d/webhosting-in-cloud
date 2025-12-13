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

## Deployment on AWS EC2

This guide covers deployment on **Amazon Linux 2023** and **Ubuntu**.

### 1. Launch an Instance
- **OS**: Amazon Linux 2023 (recommended) or Ubuntu Server.
- **Instance Type**: t3.micro (adequate for small apps).
- **Security Group (Firewall)**:
  - Allow **Custom TCP Rule** on port `3000` (Source: `0.0.0.0/0` or your specific IP).
  - Allow **SSH** on port `22`.
  - Optionally allow `80` (HTTP) and `443` (HTTPS) if you plan to set up a reverse proxy later.

### 2. Install Docker
Connect to your instance via SSH: `ssh -i <your-key.pem> ec2-user@<public-ip>`

#### For Amazon Linux 2023:
```bash
sudo yum update -y
sudo yum install -y docker
sudo service docker start
sudo usermod -a -G docker ec2-user
# Log out and log back in for group changes to take effect
exit
```

#### For Ubuntu:
```bash
sudo apt-get update
sudo apt-get install -y docker.io docker-compose
sudo usermod -aG docker $USER
# Log out and log back in
exit
```

### 3. Deploy Application

1.  **Clone the Repository**:
    ```bash
    # Install git if needed
    sudo yum install git -y # Amazon Linux
    # sudo apt install git -y # Ubuntu

    git clone <YOUR_REPO_URL>
    cd webhosting-in-cloud
    ```

2.  **Start the Application**:
    *Make sure you have `docker-compose` installed. On Amazon Linux 2023, you might need to install it manually or use `docker compose` (V2) if available.*

    **Using standard Docker Build (Recommended for simplicity):**
    ```bash
    # Build the image
    docker build -t nextjs-app .

    # Run the container
    docker run -d -p 3000:3000 --restart always --name webapp nextjs-app
    ```

    **Using Docker Compose (if installed):**
    ```bash
    docker-compose up -d --build
    ```

### 4. Access the App
Open your browser and navigate to:
`http://<YOUR_EC2_PUBLIC_IP>:3000`
