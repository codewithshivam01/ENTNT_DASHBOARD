// import React, { useContext } from 'react';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthContext } from './contexts/AuthContext';
// import LoginPage from './pages/LoginPage';
// import DashboardPage from './pages/DashboardPage';
// import EquipmentPage from './pages/EquipmentPage';
// import EquipmentDetailPage from './pages/EquipmentDetailPage';
// import RentalsPage from './pages/RentalsPage';
// import MaintenancePage from './pages/MaintenancePage';
// import ProtectedRoute from './components/ProtectedRoute';
// import Layout from './components/Layout/Layout';

// const App = () => {
//   const { user } = useContext(AuthContext);

//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/login" element={<LoginPage />} />
//         <Route element={<ProtectedRoute />}>
//         <Route element={<Layout />}>
//           <Route path="/" element={<Navigate to="/dashboard" />} />
//           <Route path="/dashboard" element={<DashboardPage />} />
//           <Route path="/equipment" element={<EquipmentPage />} />
//           <Route path="/equipment/:id" element={<EquipmentDetailPage />} />
//           <Route path="/rentals" element={<RentalsPage />} />
//           <Route path="/maintenance" element={<MaintenancePage />} />
//           </Route>
//         </Route>
//         <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default App;

// src/App.jsx
// import React, { useContext } from 'react';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// import { AuthContext } from './contexts/AuthContext';
// import ProtectedRoute from './components/ProtectedRoute';
// import Layout from './components/Layout/Layout';

// import LoginPage from './pages/LoginPage';
// import DashboardPage from './pages/DashboardPage';
// import EquipmentPage from './pages/EquipmentPage';
// import EquipmentDetailPage from './pages/EquipmentDetailPage';
// import RentalsPage from './pages/RentalsPage';
// import MaintenancePage from './pages/MaintenancePage';

// export default function App() {
//   const { user } = useContext(AuthContext);

//   return (
//     <BrowserRouter>
//       <Routes>

//         {/* Public route */}
//         <Route path="/login" element={<LoginPage />} />

//         {/* All routes below require auth */}
//         <Route element={<ProtectedRoute />}>
//           {/* Layout includes NavBar + Sidebar */}
//           <Route element={<Layout />}>

//             {/* Redirect root to dashboard */}
//             <Route index element={<Navigate to="/dashboard" replace />} />

//             {/* App pages */}
//             <Route path="dashboard" element={<DashboardPage />} />
//             <Route path="equipment" element={<EquipmentPage />} />
//             <Route path="equipment/:id" element={<EquipmentDetailPage />} />
//             <Route path="rentals" element={<RentalsPage />} />
//             <Route path="maintenance" element={<MaintenancePage />} />

//           </Route>
//         </Route>

//         {/* Fallback */}
//         <Route
//           path="*"
//           element={<Navigate to={user ? "/" : "/login"} replace />}
//         />

//       </Routes>
//     </BrowserRouter>
//   );
// }

// src/App.jsx
// import React, { useContext } from 'react';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// import { AuthContext } from './contexts/AuthContext';
// import ProtectedRoute from './components/ProtectedRoute';
// import Layout from './components/Layout/Layout';

// import LoginPage from './pages/LoginPage';
// import DashboardPage from './pages/DashboardPage';
// import EquipmentPage from './pages/EquipmentPage';
// import EquipmentDetailPage from './pages/EquipmentDetailPage';
// import EquipmentForm from './components/Equipment/EquipmentForm';
// import RentalsPage from './pages/RentalsPage';
// import MaintenancePage from './pages/MaintenancePage';

// export default function App() {
//   const { user } = useContext(AuthContext);

//   return (
//     <BrowserRouter>
//       <Routes>

//         {/* Public route */}
//         <Route path="/login" element={<LoginPage />} />

//         {/* Protected routes */}
//         <Route element={<ProtectedRoute />}>
//           <Route element={<Layout />}>
//             {/* Redirect root to dashboard */}
//             <Route index element={<Navigate to="/dashboard" replace />} />

//             {/* Dashboard */}
//             <Route path="dashboard" element={<DashboardPage />} />

//             {/* Equipment CRUD */}
//             <Route path="equipment" element={<EquipmentPage />} />
//             <Route path="equipment/new" element={<EquipmentForm />} />
//             <Route path="equipment/:id" element={<EquipmentDetailPage />} />
//             <Route path="equipment/:id/edit" element={<EquipmentForm />} />

//             {/* Rentals */}
//             <Route path="rentals" element={<RentalsPage />} />

//             {/* Maintenance */}
//             <Route path="maintenance" element={<MaintenancePage />} />
//           </Route>
//         </Route>

//         {/* Fallback */}
//         <Route
//           path="*"
//           element={<Navigate to={user ? "/" : "/login"} replace />}
//         />

//       </Routes>
//     </BrowserRouter>
//   );
// }

// src/App.jsx
// import React, { useContext } from 'react';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// import { AuthContext } from './contexts/AuthContext';
// import ProtectedRoute from './components/ProtectedRoute';
// import Layout from './components/Layout/Layout';

// import LoginPage from './pages/LoginPage';
// import DashboardPage from './pages/DashboardPage';
// import EquipmentPage from './pages/EquipmentPage';
// import EquipmentDetailPage from './pages/EquipmentDetailPage';
// import EquipmentForm from './components/Equipment/EquipmentForm';
// import RentalsPage from './pages/RentalsPage';
// import MaintenancePage from './pages/MaintenancePage';
// import UnauthorizedPage from './pages/UnauthorizedPage';

// export default function App() {
//   const { user } = useContext(AuthContext);

//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Public */}
//         <Route path="/login" element={<LoginPage />} />

//         {/* Protected: any logged-in user */}
//         <Route element={<ProtectedRoute />}>
//           <Route element={<Layout />}>
//             {/* redirect “/” → “/dashboard” */}
//             <Route index element={<Navigate to="/dashboard" replace />} />

//             {/* Everyone sees Dashboard */}
//             <Route path="dashboard" element={<DashboardPage />} />

//             {/* Equipment - everyone can view list & detail */}
//             <Route path="equipment" element={<EquipmentPage />} />
//             <Route path="equipment/:id" element={<EquipmentDetailPage />} />

//             {/* Equipment forms - only Admin & Staff */}
//             <Route
//               element={<ProtectedRoute allowedRoles={['Admin','Staff']} />}
//             >
//               <Route path="equipment/new" element={<EquipmentForm />} />
//               <Route path="equipment/:id/edit" element={<EquipmentForm />} />
//             </Route>

//             {/* Rentals - everyone can view & create their own rentals */}
//             <Route path="rentals" element={<RentalsPage />} />

//             {/* Maintenance - only Admin & Staff */}
//             <Route
//               element={<ProtectedRoute allowedRoles={['Admin','Staff']} />}
//             >
//               <Route path="maintenance" element={<MaintenancePage />} />
//             </Route>

//             {/* Unauthorized fallback */}
//             <Route path="unauthorized" element={<UnauthorizedPage />} />
//           </Route>
//         </Route>

//         {/* Anything else → login or dashboard */}
//         <Route
//           path="*"
//           element={<Navigate to={user ? "/" : "/login"} replace />}
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// }

import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthContext } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout/Layout";

import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import EquipmentPage from "./pages/EquipmentPage";
import EquipmentDetailPage from "./pages/EquipmentDetailPage";
import EquipmentForm from "./components/Equipment/EquipmentForm";
import RentalsPage from "./pages/RentalsPage";
import MaintenancePage from "./pages/MaintenancePage";
import UnauthorizedPage from "./pages/UnauthorizedPage";

export default function App() {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected: any authenticated user */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            {/* Redirect “/” → “/dashboard” */}
            <Route index element={<Navigate to="/dashboard" replace />} />

            {/* Dashboard */}
            <Route path="dashboard" element={<DashboardPage />} />

            {/* Equipment: list & detail (all roles) */}
            <Route path="equipment" element={<EquipmentPage />} />
            <Route path="equipment/:id" element={<EquipmentDetailPage />} />

            {/* Equipment forms: only Admin & Staff */}
            <Route
              element={<ProtectedRoute allowedRoles={["Admin", "Staff"]} />}
            >
              <Route path="equipment/new" element={<EquipmentForm />} />
              <Route path="equipment/:id/edit" element={<EquipmentForm />} />
            </Route>

            {/* Rentals: any role can view/create */}
            <Route path="rentals" element={<RentalsPage />} />

            {/* Maintenance: only Admin & Staff */}
            <Route
              element={<ProtectedRoute allowedRoles={["Admin", "Staff"]} />}
            >
              <Route path="maintenance" element={<MaintenancePage />} />
            </Route>

            {/* Unauthorized fallback */}
            <Route path="unauthorized" element={<UnauthorizedPage />} />
          </Route>
        </Route>

        {/* Anything else → redirect to login or dashboard */}
        <Route
          path="*"
          element={<Navigate to={user ? "/" : "/login"} replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}
