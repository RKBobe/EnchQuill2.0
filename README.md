# 📚 Enchanted Quill

Welcome to Enchanted Quill, a full-stack MERN application for managing a book inventory.

This project consists of two main parts:
- A **React frontend** that provides a user interface for viewing and managing books.
- A **Node.js/Express backend** that serves a RESTful API for CRUD operations on the book data, stored in a MongoDB database.

The entire application is containerized using Docker for easy setup and deployment.

## 🚀 Getting Started with Docker

The recommended way to run this project is with Docker Compose.

### Prerequisites
- [Docker](https://www.docker.com/products/docker-desktop) installed on your machine.

### Running the Application
1.  **Clone the repository:**
    ```bash
    git clone https://github.com/RKBobe/EnchQuill2.0.git
    cd EnchQuill2.0
    ```

2.  **Build and run the containers:**
    ```bash
    docker-compose up --build
    ```

3.  **Access the application:**
    -   Frontend (React App): [http://localhost:3000](http://localhost:3000)
    -   Backend API: [http://localhost:5000](http://localhost:5000)
    -   MongoDB is running on port `27017`.

To stop the application, press `Ctrl+C` in the terminal where `docker-compose` is running, and then run `docker-compose down`.

## 💻 Local Development

For more detailed information on running the frontend and backend services separately for development, please see the individua

-   [Frontend README](./frontend/README.md)
-   [Backend README](./backend/README.md)