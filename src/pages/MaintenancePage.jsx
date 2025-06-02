import React from 'react';
import MaintenanceForm from '../components/Maintenance/MaintenanceForm';
import MaintenanceList from '../components/Maintenance/MaintenanceList';

export default function MaintenancePage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4 dark:text-gray-400">Maintenance Records</h1>
      <MaintenanceForm />
      <MaintenanceList />
    </div>
  );
}
