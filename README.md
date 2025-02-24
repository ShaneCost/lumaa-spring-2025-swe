# Task Management Application

## [Video Demonstration](https://youtu.be/QVBKtww057E)

## Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v16 or later)
- **PostgreSQL** database
- **npm** 

---

## Backend Setup

### 1. Set Up the Database

1. **Create a `.env` file** in the root of the backend folder with the following environment variables:
    ```env
    DB_USER=your_database_user
    DB_HOST=localhost
    DB_NAME=task_management_db
    DB_PASS=your_database_password
    DB_PORT=5432
    JWT_SECRET=your_jwt_secret_key
    ```

2. **Migrations**:
    - To create the necessary tables in the PostgreSQL database, you need to run SQL migrations. Use the following command line instructions to achieve this.

    ```bash
    $ psql -U postgres
      # CREATE DATABASE task_management;
      # exit;
    $ cd backend/src
    $ psql -U postgres -d task_management -f migrations.sql
    ```

    

---

### 2. Run the Backend

1. Install the required dependencies:

    ```bash
    cd backend
    npm install
    ```

3. Start the backend server:

    ```bash
    npx ts-node src/server.ts
    ```

    - This will start the backend server on **port 5001**.

---

## Frontend Setup

### 1. Install the Frontend Dependencies

1. Navigate to the frontend folder and install the required dependencies:

    ```bash
    cd frontend
    npm install
    ```

### 2. Run the Frontend

1. Start the frontend development server:

    ```bash
    npm start
    ```

    - This will start the frontend server on **port 3000** by default.

---

## Salary Expectations per Month

- **Salary Expectations**: My salary expectation for this position is **$3500 - $4500 USD/month**




