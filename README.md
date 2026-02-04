# Enchanted Quill - Bookstore Management System

Enchanted Quill is a full-stack bookstore management platform designed with a microservices-inspired architecture using Docker. It features a consumer storefront, an administrative dashboard, and a centralized Node.js API.

## 🏗️ Architecture Overview
- **Frontend (Consumer):** React/Vite (Port 3000)
- **Frontend (Admin):** React/Nginx Static Build (Port 3001)
- **Backend:** Node.js/Express API (Port 5000)
- **Database:** MongoDB (Port 27017)

## 🚀 Quick Start
Ensure you have **Docker Desktop** installed.

1. Clone the repository.
2. Run the orchestration:
   ```bash
   docker-compose up -d --build
