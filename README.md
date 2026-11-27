# Product Management System

A full-stack web application for managing products, categories, and inventory. Built using **React, Django REST Framework, and PostgreSQL**, with JWT authentication and role-based access control.

##  Features

### Authentication & Authorization
- User registration and login
- JWT-based authentication
- Automatic access token refresh
- Protected frontend routes
- Role-based permissions
- User-specific product management

### Product Management
- Add new products
- View product details
- Update existing products
- Delete products
- Assign products to categories
- Manage product stock and prices

### Dashboard
- Product statistics
- Category statistics
- Product search
- Category filtering
- Pagination
- Loading indicators and empty states

### API Features
- RESTful API architecture
- JWT authentication
- Search and filtering
- Ordering
- Pagination
- Custom permissions

##  Technologies Used

| Frontend | Backend | Database & Tools |
|---|---|---|
| React | Python | PostgreSQL |
| JavaScript | Django | Git |
| Bootstrap 5 | Django REST Framework | GitHub |
| React Router | Simple JWT | Axios |
| Axios | django-filter | Vite |

##  Project Structure

```text
product-management-system/
│
├── backend/
│   ├── config/
│   ├── products/
│   ├── manage.py
│   ├── requirements.txt
│   ├── .env.example
│   └── .gitignore
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── .env.example
│
├── .gitignore
└── README.md
```

##  Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/akhilbandaru326/product-management-system.git

cd product-management-system
```

### 2. Backend Setup (Django)

Navigate to the backend folder:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate the virtual environment.

Windows:

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create a `.env` file using `.env.example` and configure your environment variables:

```env
SECRET_KEY=your-django-secret-key
DEBUG=True

DB_NAME=product_management
DB_USER=postgres
DB_PASSWORD=your_postgresql_password
DB_HOST=localhost
DB_PORT=5432
```

Create the PostgreSQL database named `product_management`.

Apply migrations:

```bash
python manage.py migrate
```

Create an admin user:

```bash
python manage.py createsuperuser
```

Start the Django development server:

```bash
python manage.py runserver
```

Backend runs at:

http://127.0.0.1:8000/

### 3. Frontend Setup (React)

Open another terminal and navigate to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file using `.env.example`:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api/
```

Start the React development server:

```bash
npm run dev
```

Frontend runs at:

http://localhost:5173/

##  API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/register/` | Register a new user |
| POST | `/api/token/` | Obtain JWT tokens |
| POST | `/api/token/refresh/` | Refresh access token |
| GET | `/api/products/` | List products |
| POST | `/api/products/` | Create product |
| GET | `/api/products/{id}/` | Retrieve product |
| PATCH | `/api/products/{id}/`
