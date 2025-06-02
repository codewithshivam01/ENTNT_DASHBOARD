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
        <Route path="/login" element={<LoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />

            <Route path="dashboard" element={<DashboardPage />} />

            <Route path="equipment" element={<EquipmentPage />} />
            <Route path="equipment/:id" element={<EquipmentDetailPage />} />

            <Route
              element={<ProtectedRoute allowedRoles={["Admin", "Staff"]} />}
            >
              <Route path="equipment/new" element={<EquipmentForm />} />
              <Route path="equipment/:id/edit" element={<EquipmentForm />} />
            </Route>

            <Route path="rentals" element={<RentalsPage />} />

            <Route
              element={<ProtectedRoute allowedRoles={["Admin", "Staff"]} />}
            >
              <Route path="maintenance" element={<MaintenancePage />} />
            </Route>

            <Route path="unauthorized" element={<UnauthorizedPage />} />
          </Route>
        </Route>

        <Route
          path="*"
          element={<Navigate to={user ? "/" : "/login"} replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}
