# Employee Management System

A full-stack Employee Management System built using the MERN Stack (MongoDB, Express.js, React.js, Node.js). The application provides secure administrator authentication and complete employee management through a modern and responsive web interface.

---

## Features

### Authentication
- Administrator Registration
- Secure Login using JWT Authentication
- Protected Routes
- Logout Functionality

### Dashboard
- Total Employees
- Active Employees
- Inactive Employees
- Total Departments
- Total Salary
- Recent Employees

### Employee Management
- Add Employee
- View Employees
- Edit Employee
- Delete Employee

### User Interface
- Responsive Design
- Bootstrap 5
- Bootstrap Icons
- React Toastify Notifications
- Loading Spinner
- 404 Page

---

## Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios
- Bootstrap 5
- Bootstrap Icons
- React Toastify

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JSON Web Token (JWT)
- bcrypt.js

---

## Project Structure

```
Employee_Management_System
│
├── client
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
├── server
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── config
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## Installation

### Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/Employee_Management_System.git
```

### Backend

```bash
cd server
npm install
npm start
```

### Frontend

```bash
cd client
npm install
npm start
```

---

## Environment Variables

Create a `.env` file inside the `server` folder.

```env
PORT=5000

MONGO_URI=YOUR_MONGODB_CONNECTION_STRING

JWT_SECRET=YOUR_SECRET_KEY
```

---

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /api/auth/register | Register Admin |
| POST | /api/auth/login | Login Admin |

### Employees

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /api/employees | Get All Employees |
| GET | /api/employees/:id | Get Employee |
| POST | /api/employees | Add Employee |
| PUT | /api/employees/:id | Update Employee |
| DELETE | /api/employees/:id | Delete Employee |

---

## Future Enhancements

- Employee Profile Pictures
- Department Management
- Attendance Management
- Payroll Management
- Role-Based Access Control
- Export Employees to Excel/PDF
- Dark Mode

---

## Author

**Rahul Gugulothu**

B.Tech Computer Science & Engineering

Keshav Memorial Institute of Technology

---

## License

This project is developed for educational purposes.