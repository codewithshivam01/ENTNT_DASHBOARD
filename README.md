ENTNT Equipment Rental Management Dashboard
A frontend‐only React application for managing equipment inventory, rental orders, and maintenance records at ENTNT. It includes role‐based access (Admin, Staff, Customer), localStorage persistence (no backend), responsive design with dark mode, a notifications center, dashboard charts.

  Table of Contents
1.Features
2.Tech Stack
3.Project Structure
4.Installation
5.Usage
6.ole‐Based Access
7.Dark Mode
8.Deployment

Features
Authentication & Roles
   Hard‐coded users in localStorage:
   Admin: admin@entnt.in / admin123
   Staff: staff@entnt.in / staff123
   Customer: customer@entnt.in / cust123
  Login/logout, session persistence.
  Protected routes & UI elements by role.
  
Equipment Management
  List, add, edit, delete equipment (only Admin).
  edit,view (staff).
  Equipment detail view. (customer)

Rental Orders
  Create rental (Staff/Admin can choose any customer; Customer can only rent themselves).
  Rental list filtered by role.
  Calendar view (month/week/day).
  Update status (Reserved → Rented → Returned).
  Automatically marks equipment “Rented” when a rental is created.

Maintenance Records
  Add, view, delete maintenance (Admin/Staff).
  Dismissible notifications on scheduling.

Dashboard
  KPI cards: total equipment, available vs. rented, overdue rentals, upcoming maintenance.
  Charts via Recharts (pie: equipment by category; bar: rentals per equipment).

Notifications Center
  Global notification context.
  Bell icon with badge in the NavBar.
  Dismissable list.

Rental Calendar
  React‐Big‐Calendar with month/week/day.
  Prevents navigating before today and selecting past dates.
  Custom styling: light‐blue today highlight, weekend shading, blue event bars.

Responsive & Dark Mode
  Tailwind CSS for utility‐first styling.
  NavBar that collapse into a hamburger menu on mobile.
  Dark mode toggle using react-toggle-dark-mode. Preference saved in localStorage.


Tech Stack
  React 18 (functional components + hooks)
  React Router v6 (routing & protected routes)
  Context API (Auth, Equipment, Rentals, Maintenance, Notifications, Theme)
  Tailwind CSS (utility‐first styling, dark mode)
  react‐toggle‐dark‐mode (DarkModeSwitch component)
  React‐Big‐Calendar (rental calendar + agenda)
  Recharts (dashboard charts)
  date‐fns (date utilities)
  uuid (unique IDs)

Project Structure
src/
│
├── components/
│   ├── Authentication/
│   │   └── LoginForm.jsx
│   ├── Dashboard/
│   │   ├── KPICards.jsx
│   │   └── Charts.jsx
│   ├── Equipment/
│   │   ├── EquipmentList.jsx
│   │   ├── EquipmentDetail.jsx
│   │   └── EquipmentForm.jsx
│   ├── Rentals/
│   │   ├── RentalList.jsx
│   │   ├── RentalForm.jsx
│   │   └── RentalCalendar.jsx
│   ├── Maintenance/
│   │   ├── MaintenanceList.jsx
│   │   └── MaintenanceForm.jsx
│   ├── Notifications/
│   │   └── NotificationCenter.jsx
│   └── Layout/
│       ├── NavBar.jsx
│       ├── Sidebar.jsx
│       └── Layout.jsx
│
├── contexts/
│   ├── AuthContext.jsx
│   ├── EquipmentContext.jsx
│   ├── RentalsContext.jsx
│   ├── MaintenanceContext.jsx
│   ├── NotificationsContext.jsx
│  
│
├── pages/
│   ├── LoginPage.jsx
│   ├── DashboardPage.jsx
│   ├── EquipmentPage.jsx
│   ├── EquipmentDetailPage.jsx
│   ├── RentalsPage.jsx
│   ├── MaintenancePage.jsx
│   └── UnauthorizedPage.jsx
│
├── utils/
│   ├── localStorageUtils.js
│   └── roleUtils.js
│
├── App.jsx
├── index.js
└── styles/
    └── main.css

Installation
1.Clone the repository
  git clone https://github.com/your-username/entnt-equipment-dashboard.git
  cd entnt-equipment-dashboard

2.Install dependencies
   npm install

3.Tailwind Setup
  Tailwind and PostCSS are already configured (tailwind.config.js with darkMode: 'class').
  src/styles/main.css includes the base @tailwind directives.

Usage

1.Log in
   Go to /login.
   Use one of the hard‐coded credentials:
   Admin: admin@entnt.in / admin123
   Staff: staff@entnt.in / staff123
   Customer: customer@entnt.in / cust123

2.Dashboard
   KPI cards and Recharts charts accessible to all roles.

3.Equipment
   Admin/Staff can add/edit/delete equipment.
   Customer can only view.

4.Rentals
   Customer can rent for self; Staff/Admin can rent for any.
   Rental list & status updates.
   Rental calendar with Agenda, blocking past dates.

5.Maintenance
  Admin/Staff can add/view/delete maintenance; Customer cannot.
  Date picker prevents selecting past dates.

6.Notifications
   New rentals or maintenance trigger a notification.
   Bell icon in NavBar shows badge count; dropdown lists messages.

7.Dark Mode
  Click the moon/sun switch in the NavBar (from react-toggle-dark-mode).
  The entire app toggles between light and dark. Preference stored in localStorage.

8.Logout
  Click “Logout” (desktop) or the mobile menu item to clear session.

Role‐Based Access
Role	               Permissions
Admin	              • Dashboard
                • Equipment CRUD (all)
            • Rentals CRUD & status updates
                  • Maintenance CRUD
                   • Notifications

Staff	             • Dashboard
                • Equipment EDIT AND VIEW
              • Rentals CRUD & status updates
                  • Maintenance CRUD
                     • Notifications

Customer	     • Dashboard (own rentals)
                   • View-only Equipment
                 • Create/View own rentals
                • View calendar (own rentals)
                      • Notifications
                • Cannot access maintenance

NOTE-Protected routes and UI elements verify user.role using roleUtils.js and ProtectedRoute.jsx. Unauthorized attempts redirect to /unauthorized.

Dark Mode
 Tailwind CSS set to darkMode: 'class'.
 ThemeContext in index.js toggles class="dark" on <html>.
 NavBar incorporates a <DarkModeSwitch /> (24px) from react-toggle-dark-mode.
 Light‐mode: white/light backgrounds. Dark‐mode: gray/indigo backgrounds and lighter text.

Deployment
To deploy, build and host the build/ folder:

 1.Build
   npm run build

2.Deploy
  Deployed at vercel



