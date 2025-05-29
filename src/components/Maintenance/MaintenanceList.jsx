
import React, { useContext } from 'react';
import { MaintenanceContext } from '../../contexts/MaintenanceContext';
import { EquipmentContext } from '../../contexts/EquipmentContext';

export default function MaintenanceList() {
  const { records, remove } = useContext(MaintenanceContext);
  const { equipment } = useContext(EquipmentContext);

  return (
    <table className="w-full mt-4">
      <thead>
        <tr>
          {['Equipment','Date','Type','Notes','Actions'].map(h => (
            <th key={h} className="p-2">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {records.map(m => {
          const eq = equipment.find(e => e.id === m.equipmentId);
          return (
            <tr key={m.id} className="border-t">
              <td className="p-2">{eq?.name || m.equipmentId}</td>
              <td className="p-2">{m.date}</td>
              <td className="p-2">{m.type}</td>
              <td className="p-2">{m.notes}</td>
              <td className="p-2">
                <button onClick={() => remove(m.id)} className="text-red-600">
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
