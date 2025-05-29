import React from 'react';
import EquipmentList from '../components/Equipment/EquipmentList';

export default function EquipmentPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Equipment</h1>
      <EquipmentList />
    </div>
  );
}
