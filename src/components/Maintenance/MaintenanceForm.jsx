import React, { useState, useContext, useEffect } from 'react';
import { MaintenanceContext } from '../../contexts/MaintenanceContext';
import { EquipmentContext } from '../../contexts/EquipmentContext';
import { NotificationsContext } from '../../contexts/NotificationsContext';
import { v4 as uuid } from 'uuid';

export default function MaintenanceForm() {
  const { add } = useContext(MaintenanceContext);
  const { equipment } = useContext(EquipmentContext);
  const { addNotification } = useContext(NotificationsContext);

  //Compute today’s date in “YYYY-MM-DD” form
  const [today, setToday] = useState(
    new Date().toISOString().split('T')[0]
  );

  const [form, setForm] = useState({
    equipmentId: '',
    date: '',
    type: '',
    notes: ''
  });

  const onSubmit = e => {
    e.preventDefault();

    // for preventing previous date
    if (form.date < today) {
      alert('Date cannot be before today.');
      return;
    }

    const newRecord = { ...form, id: uuid() };
    add(newRecord);

    // Notify user
    const eq = equipment.find(e => e.id === form.equipmentId);
    addNotification(
      `Maintenance scheduled for ${eq?.name || 'Equipment'} on ${form.date}`
    );

    // Reset form
    setForm({
      equipmentId: '',
      date: '',
      type: '',
      notes: ''
    });
  };

  return (
    <form onSubmit={onSubmit} className="bg-white dark:bg-gray-800 p-4 rounded shadow mb-6">
      <div className="grid grid-cols-1  dark:text-gray-400 dark:bg-gray-800 md:grid-cols-2 gap-4">
        <select
          required
          value={form.equipmentId}
          onChange={e => setForm({ ...form, equipmentId: e.target.value })}
          className="border p-2 rounded dark:text-gray-400 dark:bg-gray-800"
        >
          <option value="">Select Equipment</option>
          {equipment.map(e => (
            <option key={e.id} value={e.id}>
              {e.name}
            </option>
          ))}
        </select>

        <input
          type="date"
          required
          value={form.date}
          onChange={e => setForm({ ...form, date: e.target.value })}
          min={today}
          className="border p-2 rounded dark:text-gray-400 dark:bg-gray-800"
        />

        <input
          type="text"
          placeholder="Maintenance Type"
          required
          value={form.type}
          onChange={e => setForm({ ...form, type: e.target.value })}
          className="border p-2 rounded dark:text-gray-400 dark:bg-gray-800"
        />

        <textarea
          placeholder="Notes"
          required
          value={form.notes}
          onChange={e => setForm({ ...form, notes: e.target.value })}
          className="border p-2 rounded dark:text-gray-400 dark:bg-gray-800"
        />
      </div>

      <button
        type="submit"
        className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
      >
        Add Record
      </button>
    </form>
  );
}
