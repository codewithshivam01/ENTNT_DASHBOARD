// import React from 'react';
// import ReactDOM from 'react-dom/client'; // correct for React 18+
// import App from './App';
// import { AuthProvider } from './contexts/AuthContext';
// import { EquipmentProvider } from './contexts/EquipmentContext';
// import { RentalsProvider } from './contexts/RentalsContext';
// import { MaintenanceProvider } from './contexts/MaintenanceContext';
// import './styles/main.css';
// import { NotificationsProvider } from './contexts/NotificationsContext';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <AuthProvider>
//   <NotificationsProvider>
//     <EquipmentProvider>
//       <RentalsProvider>
//         <MaintenanceProvider>
//           <App />
//         </MaintenanceProvider>
//       </RentalsProvider>
//     </EquipmentProvider>
//     </NotificationsProvider>
//   </AuthProvider>
// );

// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';
// import { AuthProvider } from './contexts/AuthContext';
// import { EquipmentProvider } from './contexts/EquipmentContext';
// import { RentalsProvider } from './contexts/RentalsContext';
// import { MaintenanceProvider } from './contexts/MaintenanceContext';
// import { NotificationsProvider } from './contexts/NotificationsContext';
// import './styles/main.css';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <AuthProvider>
//     <NotificationsProvider>
//       <EquipmentProvider>
//         <RentalsProvider>
//           <MaintenanceProvider>
//             <App />
//           </MaintenanceProvider>
//         </RentalsProvider>
//       </EquipmentProvider>
//     </NotificationsProvider>
//   </AuthProvider>
// );

// src/index.js
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';
// import { AuthProvider } from './contexts/AuthContext';
// import { EquipmentProvider } from './contexts/EquipmentContext';
// import { RentalsProvider } from './contexts/RentalsContext';
// import { MaintenanceProvider } from './contexts/MaintenanceContext';
// import { NotificationsProvider } from './contexts/NotificationsContext';
// import './styles/main.css';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <AuthProvider>
//     <NotificationsProvider>         {/* NotificationsProvider must wrap App */}
//       <EquipmentProvider>
//         <RentalsProvider>
//           <MaintenanceProvider>
//             <App />
//           </MaintenanceProvider>
//         </RentalsProvider>
//       </EquipmentProvider>
//     </NotificationsProvider>
//   </AuthProvider>
// );


// src/index.js
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import { EquipmentProvider } from './contexts/EquipmentContext';
import { RentalsProvider } from './contexts/RentalsContext';
import { MaintenanceProvider } from './contexts/MaintenanceContext';
import { NotificationsProvider } from './contexts/NotificationsContext';
import './styles/main.css';

// A small component to wrap App and control the 'dark' class on <html>
function ThemeWrapper({ children }) {
  // Try to read saved mode from localStorage; default to light (false)
  const [isDark, setIsDark] = useState(() => {
    try {
      const saved = localStorage.getItem('entnt-theme');
      return saved === 'dark';
    } catch {
      return false;
    }
  });

  // Whenever isDark changes, toggle the 'dark' class on <html> and save
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('entnt-theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('entnt-theme', 'light');
    }
  }, [isDark]);

  return (
    // Pass both the value and the setter via context‐like props so NavBar can toggle
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Create a React Context so any component (NavBar) can flip the mode
export const ThemeContext = React.createContext({
  isDark: false,
  setIsDark: () => {},
});

const root = ReactDOM.createRoot(document.getElementById('root'));
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


