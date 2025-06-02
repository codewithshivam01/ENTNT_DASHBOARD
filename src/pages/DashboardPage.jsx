import React from 'react';
import KPICards from '../components/Dashboard/KPICards';
import Charts from '../components/Dashboard/Charts';

export default function DashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4 dark:text-gray-400">Dashboard</h1>
      <KPICards />
      <Charts />
    </div>
  );
}
