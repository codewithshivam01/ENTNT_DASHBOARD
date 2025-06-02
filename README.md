# ENTNT Equipment Rental Management Dashboard

A **frontend-only React** application for managing equipment inventory, rental orders, and maintenance records at ENTNT. It features role-based access, localStorage persistence, responsive design, dark mode, a notifications center, and dashboard charts.

---

## 📚 Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Installation](#installation)
5. [Usage](#usage)
6. [Role-Based Access](#role-based-access)
7. [Dark Mode](#dark-mode)
8. [Deployment](#deployment)

---

## 🚀 Features

### 🔐 Authentication & Roles
- **Hard-coded users stored in localStorage:**
  - **Admin**: `admin@entnt.in / admin123`
  - **Staff**: `staff@entnt.in / staff123`
  - **Customer**: `customer@entnt.in / cust123`
- Login/logout with session persistence.
- Protected routes and UI elements based on user role.

### 🧰 Equipment Management
- Admin: full CRUD.
- Staff: edit, view.
- Customer: view only.

### 📦 Rental Orders
- Create rentals (Staff/Admin for any customer, Customer for self).
- Rental list filtered by role.
- Calendar view (month/week/day).
- Status updates: `Reserved → Rented → Returned`.
- Equipment automatically marked as "Rented".

### 🛠️ Maintenance Records
- Admin/Staff can add, view, delete.
- Notifications on scheduling.

### 📊 Dashboard
- KPI cards: total equipment, rented vs. available, overdue rentals, upcoming maintenance.
- Charts (via Recharts): 
  - Pie chart (equipment by category)
  - Bar chart (rentals per equipment)

### 🔔 Notifications Center
- Global notification context.
- Bell icon with badge.
- Dismissible notification list.

### 🗓 Rental Calendar
- **React-Big-Calendar** with custom styling.
- No navigation to past dates.
- Light-blue highlight for today, shaded weekends, blue event bars.

### 🌙 Responsive & Dark Mode
- **Tailwind CSS** for utility-first styling.
- Responsive NavBar with hamburger on mobile.
- Dark mode toggle using `react-toggle-dark-mode` with localStorage persistence.

---

## 🛠 Tech Stack

- **React 18** (hooks & functional components)
- **React Router v6** (routing & protected routes)
- **Context API** (state management)
- **Tailwind CSS** (styling)
- `react-toggle-dark-mode`
- `react-big-calendar`
- `recharts`
- `date-fns`
- `uuid`

---

## 📁 Project Structure

