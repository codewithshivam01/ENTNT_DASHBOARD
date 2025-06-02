import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./contexts/AuthContext";
import { EquipmentProvider } from "./contexts/EquipmentContext";
import { RentalsProvider } from "./contexts/RentalsContext";
import { MaintenanceProvider } from "./contexts/MaintenanceContext";
import { NotificationsProvider } from "./contexts/NotificationsContext";
import "./styles/main.css";

function ThemeWrapper({ children }) {
  const [isDark, setIsDark] = useState(() => {
    try {
      const saved = localStorage.getItem("entnt-theme");
      return saved === "dark";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("entnt-theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("entnt-theme", "light");
    }
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const ThemeContext = React.createContext({
  isDark: false,
  setIsDark: () => {},
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <NotificationsProvider>
      <EquipmentProvider>
        <RentalsProvider>
          <MaintenanceProvider>
            <ThemeWrapper>
              <App />
            </ThemeWrapper>
          </MaintenanceProvider>
        </RentalsProvider>
      </EquipmentProvider>
    </NotificationsProvider>
  </AuthProvider>
);
