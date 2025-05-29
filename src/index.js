import ReactDOM from 'react-dom';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import { EquipmentProvider } from './contexts/EquipmentContext';
import { RentalsProvider } from './contexts/RentalsContext';
import { MaintenanceProvider } from './contexts/MaintenanceContext';
import './styles/main.css';

ReactDOM.render(
  <AuthProvider>
    <EquipmentProvider>
      <RentalsProvider>
        <MaintenanceProvider>
          <App />
        </MaintenanceProvider>
      </RentalsProvider>
    </EquipmentProvider>
  </AuthProvider>,
  document.getElementById('root')
);
