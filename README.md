# Smart Task Manager

A production-ready full stack task manager built with React, Vite, Tailwind CSS, Node.js, Express, MongoDB, Mongoose, JWT and bcrypt.

## Folder structure

```txt
smart-task-manager/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── taskController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   ├── models/
│   │   ├── Task.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── api.js
│   │   ├── components/
│   │   │   ├── AuthLayout.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── TaskCard.jsx
│   │   │   └── TaskForm.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Signup.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
└── README.md
```

## Local setup

### Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Update `.env` with your MongoDB URI and JWT secret.

### Frontend

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

## API routes

### Auth

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/auth/me`

### Tasks

All task routes require a bearer token.

- `GET /api/tasks`
- `GET /api/tasks?status=pending`
- `GET /api/tasks?status=completed`
- `POST /api/tasks`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`

## Deployment

### MongoDB Atlas

1. Create a MongoDB Atlas cluster.
2. Create a database user.
3. Add your deployment IPs or allow access from anywhere for hosted services.
4. Copy the connection string and use it as `MONGO_URI`.

### Backend on Render

1. Create a new Web Service from the backend repository/folder.
2. Set build command: `npm install`.
3. Set start command: `npm start`.
4. Add environment variables:
   - `PORT=5000`
   - `MONGO_URI=your_atlas_connection_string`
   - `JWT_SECRET=your_long_random_secret`
   - `CLIENT_URL=https://your-vercel-app.vercel.app`

### Frontend on Vercel

1. Import the frontend project into Vercel.
2. Set framework preset to Vite.
3. Add environment variable:
   - `VITE_API_URL=https://your-render-service.onrender.com/api`
4. Deploy.

After deploying the frontend, update `CLIENT_URL` in Render to the final Vercel URL.
