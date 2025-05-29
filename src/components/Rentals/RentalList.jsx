import React, { useContext } from 'react';
import { RentalsContext } from '../../contexts/RentalsContext';
import { EquipmentContext } from '../../contexts/EquipmentContext';
import { load } from '../../utils/localStorageUtils';

export default function RentalList() {
  const { rentals, remove } = useContext(RentalsContext);
  const { equipment } = useContext(EquipmentContext);
  const users = load('users', []);

  return (
    <table className="w-full mt-4">
      <thead>
        <tr>
          {['Customer','Equipment','From','To','Status','Actions'].map(h => (
            <th key={h} className="p-2">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rentals.map(r => {
          const eq = equipment.find(e => e.id === r.equipmentId);
          const user = users.find(u => u.id === r.customerId);
          return (
            <tr key={r.id} className="border-t">
              <td className="p-2">{user?.email || r.customerId}</td>
              <td className="p-2">{eq?.name || r.equipmentId}</td>
              <td className="p-2">{r.startDate}</td>
              <td className="p-2">{r.endDate}</td>
              <td className="p-2">{r.status}</td>
              <td className="p-2">
                <button onClick={() => remove(r.id)} className="text-red-600">
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
