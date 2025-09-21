# Healthcare Management System - Backend API

This repository contains the backend service for the Healthcare Management System, a robust application built with Node.js, Express, and PostgreSQL. It provides a secure, RESTful API for user authentication, patient management, doctor management, and the mapping of patients to doctors.

**Live API Base URL:** [https://healthcare-backend-wxdv.onrender.com](https://healthcare-backend-wxdv.onrender.com)

---

## Features

-   **User Authentication**: Secure user registration and login using JSON Web Tokens (JWT).
-   **Patient Management**: Full CRUD (Create, Read, Update, Delete) operations for patient records, scoped to the authenticated user.
-   **Doctor Management**: Full CRUD operations for doctor records.
-   **Patient-Doctor Mapping**: Functionality to assign doctors to patients and manage these relationships.
-   **ORM Integration**: Uses Prisma for elegant, type-safe database interactions with a PostgreSQL database.
-   **Scalable Architecture**: Structured with a clear separation of concerns (routes, controllers, middleware) for maintainability and scalability.

---

## Tech Stack

-   **Backend**: Node.js, Express.js
-   **Database**: PostgreSQL
-   **ORM**: Prisma
-   **Authentication**: JSON Web Token (JWT), bcryptjs
-   **Deployment**: Render

---

## API Endpoints

All endpoints are prefixed with `/api`. Protected routes require a valid JWT `Bearer` token in the `Authorization` header.

### Authentication (`/auth`)

| Method | Endpoint      | Description                  | Protected |
| :----- | :------------ | :--------------------------- | :-------- |
| `POST` | `/register`   | Register a new user.         | ❌        |
| `POST` | `/login`      | Log in a user and get a JWT. | ❌        |

### Patients (`/patients`)

| Method   | Endpoint    | Description                               | Protected |
| :------- | :---------- | :---------------------------------------- | :-------- |
| `POST`   | `/`         | Add a new patient.                        | ✅        |
| `GET`    | `/`         | Get all patients for the auth'd user.     | ✅        |
| `GET`    | `/:id`      | Get a specific patient by ID.             | ✅        |
| `PUT`    | `/:id`      | Update a patient's details.               | ✅        |
| `DELETE` | `/:id`      | Delete a patient record.                  | ✅        |

### Doctors (`/doctors`)

| Method   | Endpoint    | Description                     | Protected |
| :------- | :---------- | :------------------------------ | :-------- |
| `POST`   | `/`         | Add a new doctor.               | ✅        |
| `GET`    | `/`         | Get a list of all doctors.      | ✅        |
| `GET`    | `/:id`      | Get a specific doctor by ID.    | ✅        |
| `PUT`    | `/:id`      | Update a doctor's details.      | ✅        |
| `DELETE` | `/:id`      | Delete a doctor record.         | ✅        |

### Mappings (`/mappings`)

| Method   | Endpoint        | Description                                     | Protected |
| :------- | :-------------- | :---------------------------------------------- | :-------- |
| `POST`   | `/`             | Assign a doctor to a patient.                   | ✅        |
| `GET`    | `/`             | Get all mappings for the auth'd user.           | ✅        |
| `GET`    | `/:patientId`   | Get all doctors assigned to a specific patient. | ✅        |
| `DELETE` | `/:id`          | Remove a doctor-patient assignment by its ID.   | ✅        |

---

## Database Schema (ERD)

```mermaid
erDiagram
    User {
        int id PK
        string name
        string email
        string password
    }

    Patient {
        int id PK
        string name
        int age
        int userId FK
    }

    Doctor {
        int id PK
        string name
        string specialization
    }

    PatientDoctorMapping {
        int id PK
        int patientId FK
        int doctorId FK
    }

    User ||--o{ Patient : creates
    Patient ||--o{ PatientDoctorMapping : has
    Doctor ||--o{ PatientDoctorMapping : assignedTo
```

---

## Getting Started (Local Development)

### Prerequisites

-   Node.js (v18 or later)
-   npm
-   Docker and Docker Compose (for running PostgreSQL locally)

### 1. Clone the Repository

```bash
git clone https://github.com/kritika85/Healthcare-backend.git
cd Healthcare-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root of the project and add the following variables:

```env
# PostgreSQL Connection URL
DATABASE_URL="postgresql://admin:password123@localhost:5432/healthcare"

# JWT Secret for token signing
JWT_SECRET="your-local-development-secret-key"

# Port for the server
PORT=3000
```

### 4. Run the Database with Docker

This command will start a PostgreSQL container in the background.

```bash
docker run --name postgres-healthcare -e POSTGRES_DB=healthcare -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=password123 -p 5432:5432 -d postgres:15
```

### 5. Apply Database Migrations

This command will sync your Prisma schema with the running database.

```bash
npx prisma db push
```

### 6. Run the Application

```bash
npm run dev
```

The server will start on `http://localhost:3000`.

---

## Deployment

This application is deployed on **Render**. The deployment process is automated via GitHub.

-   **Build Command**: `npm install && npm run build`
-   **Start Command**: `npm start`

The `build` script (`npx prisma generate && npx prisma db push`) ensures that the Prisma client is generated for the deployment environment and that the database schema is migrated on every new build.

---

## Author

**Kritika Jain** - [kritika85](https://github.com/kritika85)
