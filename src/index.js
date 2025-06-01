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
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import { EquipmentProvider } from './contexts/EquipmentContext';
import { RentalsProvider } from './contexts/RentalsContext';
import { MaintenanceProvider } from './contexts/MaintenanceContext';
import { NotificationsProvider } from './contexts/NotificationsContext';
import './styles/main.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <NotificationsProvider>         {/* NotificationsProvider must wrap App */}
      <EquipmentProvider>
        <RentalsProvider>
          <MaintenanceProvider>
            <App />
          </MaintenanceProvider>
        </RentalsProvider>
      </EquipmentProvider>
    </NotificationsProvider>
  </AuthProvider>
);

