import React, { useContext } from 'react';
import { EquipmentContext } from '../contexts/EquipmentContext';
import { RentalsContext } from '../contexts/RentalsContext';
import { MaintenanceContext } from '../contexts/MaintenanceContext';
import { useParams } from 'react-router-dom';

export default function EquipmentDetailPage() {
  const { id } = useParams();
  const { equipment } = useContext(EquipmentContext);
  const { rentals } = useContext(RentalsContext);
  const { records } = useContext(MaintenanceContext);

  const eq = equipment.find(e => e.id === id);
  if (!eq) return <p>Not found</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl">{eq.name}</h1>
      <p>Category: {eq.category}</p>
      <p>Condition: {eq.condition}</p>
      <p>Status: {eq.status}</p>

      <h2 className="mt-6 text-xl">Rental History</h2>
      <ul>
        {rentals.filter(r => r.equipmentId === id).map(r => (
          <li key={r.id}>{r.startDate} → {r.endDate} ({r.status})</li>
        ))}
      </ul>

      <h2 className="mt-6 text-xl">Maintenance Records</h2>
      <ul>
        {records.filter(m => m.equipmentId === id).map(m => (
          <li key={m.id}>{m.date}: {m.type} – {m.notes}</li>
        ))}
      </ul>
    </div>
  );
}
