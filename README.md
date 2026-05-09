# 🚀 Smart Task Manager

A modern full-stack task management application built with React, Vite, Tailwind CSS, Node.js, Express, MongoDB, JWT Authentication, and bcrypt.

Manage your daily tasks with a clean dashboard, authentication system, task filtering, priority management, and responsive UI.

---

# ✨ Features

## 🔐 Authentication

- User Signup
- User Login
- JWT Authentication
- Protected Routes
- Password Hashing with bcrypt

---

## ✅ Task Management

- Create Tasks
- Update Tasks
- Delete Tasks
- Filter Tasks by Status
- Task Priority System
- Due Dates
- User-Specific Tasks

---

## 🎨 Frontend

- React + Vite
- Tailwind CSS
- Responsive Design
- Interactive UI/UX
- Modern Dashboard
- Beautiful Authentication Pages

---

## ⚙️ Backend

- Node.js + Express
- MongoDB + Mongoose
- REST API
- JWT Middleware
- Error Handling
- Clean Folder Structure

---

# 🛠️ Tech Stack

| Frontend | Backend | Database | Authentication |
|---|---|---|---|
| React | Node.js | MongoDB | JWT |
| Vite | Express | Mongoose | bcrypt |
| Tailwind CSS | REST API | MongoDB Atlas | Protected Routes |

---

# 📁 Folder Structure

```txt
smart-task-manager/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   └── taskController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   │
│   ├── models/
│   │   ├── Task.js
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   │
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── api.js
│   │   │
│   │   ├── components/
│   │   │   ├── Loader.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── TaskForm.jsx
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Signup.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── vercel.json
│
├── .gitignore
└── README.md
```



## ⚡Local setup
### 1️⃣ Clone the Repository
```bash
git clone https://github.com/subodh-git77/smart-task-manager.git
cd smart-task-manager
```


### 🔥 Backend Setup

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Update `.env` with your MongoDB URI and JWT secret.

### 🎨 Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

The frontend runs on `http://localhost:5173` and the backend runs on `http://localhost:5000`.

Frontend routes:

- `/` public landing page
- `/login` login page
- `/signup` signup page
- `/dashboard` protected task dashboard

## 🛠️ Future Improvements

 - Dark Mode
 - Drag & Drop Tasks
 - Task Categories
 - Team Collaboration
 - Notifications
 - Search & Sorting
 - Calendar View

## 👨‍💻 Author

Developed with ❤️ by **Subodh Kumar Agrahari**

---
