# ⚛️ Enchanted Quill - Frontend

This is the React-based frontend for Enchanted Quill. It provides a user interface for interacting with the book inventory back

## ✨ Features

-   **Book List**: View all books in a clean, sortable table.
-   **Search**: Filter books by title or author.
-   **Add/Edit/Delete**: A modal-based form for creating, updating, and deleting book records.
-   **Responsive Design**: Built with Tailwind CSS for a responsive experience.

## ⚙️ Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or higher)
-   [npm](https://www.npmjs.com/)

## 🚀 Local Installation

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm start
    ```
    The application will be available at [http://localhost:3000](http://localhost:3000).

### Connecting to the API
The frontend expects the backend API to be running on `http://localhost:5000`. You can configure this by creating a `.env` filetory:

```env
# .env
REACT_APP_API_URL=http://localhost:5000/api/books
```
## 🐳 Running with Docker

You can also run the frontend service independently in a Docker container.

```bash
docker build -t enchanted-quill-frontend .
docker run -p 3000:3000 -e REACT_APP_API_URL=<your_api_url> enchanted-quill-frontend
```

*Note: For full application setup, refer to the root `README.md`.*
````