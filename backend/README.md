# 📚 Enchanted Quill - Backend API

The Enchanted Quill Backend is a robust, high-performance API designed to manage book inventory data. Built on the Express framtial CRUD (Create, Read, Update, Delete) operations for book records, utilizing MongoDB as its persistent data store.

## ✨ Features

-   **Book Management**: Full CRUD functionality for managing book records.
-   **Robust Routing**: Utilizes Express for clear and efficient API routing.
-   **MongoDB Integration**: Uses Mongoose for schema definition and interaction with the MongoDB database.
-   **Containerized**: Fully containerized with Docker for easy deployment.

## ⚙️ Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or higher)
-   [npm](https://www.npmjs.com/)
-   A running instance of [MongoDB](https://www.mongodb.com/).

## 🚀 Local Installation

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Configuration:**
    Create a `.env` file in the `backend` directory. For local development, it should look like this:

    ```env
    # .env
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/enchanted_quill
    ```
    *It is recommended to create a `.env.example` file to commit to your repository.*

4.  **Start the server:**
    -   For development with auto-reloading:
        ```bash
        npm run dev
        ```
    -   For production:
        ```bash
        npm start
        ```

The server will start on port 5000.

## 🐳 Running with Docker

You can also run the backend service independently in a Docker container.

```bash
docker build -t enchanted-quill-backend .
docker run -p 5000:5000 -e MONGO_URI=<your_mongo_uri> enchanted-quill-backend
```

*Note: For full application setup, refer to the root `README.md`.*

## 🗺️ API Endpoints

| Method | Route             | Description                  |
|--------|-------------------|------------------------------|
| `GET`  | `/api/books`      | Retrieve all books.          |
| `POST` | `/api/books`      | Create a new book.           |
| `PUT`  | `/api/books/:isbn`| Update a book by ISBN.       |
| `DELETE`| `/api/books/:isbn`| Delete a book by ISBN.       |
````