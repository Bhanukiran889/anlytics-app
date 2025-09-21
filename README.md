# Shanture Sales Analytics Dashboard

## Overview
This project is a MERN stack Sales Analytics Dashboard built for the Shanture Company Fresher Hiring Challenge. It demonstrates data aggregation, analytics, and modern UI development using MongoDB, Express.js, React, and Node.js.

---

## Features
- **Date-range filtering** for all analytics.
- **Aggregated metrics**: total revenue, top products, top customers, sales by region, and sales by category.
- **Interactive charts** (Apache ECharts) and tables.
- **Reports history**: Save and view previously generated analytics reports.
- **JWT authentication** for protected routes (bonus).
- **Responsive, modern UI** with Tailwind CSS and shadcn components.

---

## Tech Stack
- **Backend**: Node.js, Express.js, MongoDB (Mongoose), Socket.io(websockets)
- **Frontend**: React, Apache ECharts, Tailwind CSS, shadcn/ui
- **Database**: MongoDB (local or Atlas)

---

## Folder Structure
```
project-root/
├── backend/
│   ├── models/
│   ├── controllers/
│   ├── middleware/
│   ├── config/
│   ├── router/
│   ├── scripts/
│   ├── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   ├── public/
│   ├── package.json
├── README.md
```

---

## Database Models
- **Customer**: name, region, type
- **Product**: name, category, price
- **Sale**: customer, product, quantity, totalRevenue, reportDate
- **Report**: type, params (startDate, endDate), data, createdAt

---

## Backend API Endpoints
- `POST /auth/signin` — Sign in or auto-register, returns JWT
- `GET /api/analytics/revenue?startDate&endDate`
- `GET /api/analytics/top-products?startDate&endDate`
- `GET /api/analytics/top-customers?startDate&endDate`
- `GET /api/analytics/sales-by-region?startDate&endDate`
- `GET /api/analytics/sales-by-category?startDate&endDate`
- `POST /api/analytics/reports` — Save a report 
- `GET /api/analytics/reports` — Get all saved reports (Real time data update on change in the reports with websockets)

---

## Frontend Features
- **Dashboard**: Date range picker, key metrics, charts for all analytics.
- **Reports History**: Table of all saved reports, with ability to load a report into the dashboard.
- **Authentication**: Login page, protected routes.
- **Responsive Design**: Works on desktop and mobile.

---

## Setup & Run Instructions
### Prerequisites
- Node.js (v18+ recommended)
- MongoDB (local or Atlas)

### 1. Backend
```
cd backend
npm install
# Configure your MongoDB URI in .env (see .env.example)
node scripts/seed.js   # Seed the database with sample data
npm start
```

### 2. Frontend
```
cd frontend
npm install
npm run dev
```

---

## Environment Variables
Create a `.env` file in the backend directory:
```
MONGODB_URI=mongodb://localhost:27017/shanture
JWT_SECRET=your_jwt_secret
PORT=5000
```

---

## Database Seeding
- Run `node scripts/seed.js` in the backend to populate the database with sample customers, products, and sales data (spanning 2+ years).

---

## Aggregation & Analytics
- All analytics endpoints use MongoDB aggregation pipelines for efficient data processing.
- Reports can be saved and loaded for any date range/type.

---

## Security
- JWT authentication is implemented for protected routes.
- Passwords are hashed with bcrypt.

---

## Limitations & Notes
- No UI for adding/editing sales, products, or customers (data is seeded via script).
- Bonus features (export, advanced filtering) are not included.

---

## Contact
For any questions, contact the developer.
