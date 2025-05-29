import React, { useState, useContext } from 'react';
import { MaintenanceContext } from '../../contexts/MaintenanceContext';
import { EquipmentContext } from '../../contexts/EquipmentContext';
import { v4 as uuid } from 'uuid';

export default function MaintenanceForm() {
  const { add } = useContext(MaintenanceContext);
  const { equipment } = useContext(EquipmentContext);
  const [form, setForm] = useState({
    equipmentId: '',
    date: '',
    type: '',
    notes: ''
  });

  const onSubmit = e => {
    e.preventDefault();
    add({ ...form, id: uuid() });
    setForm({ equipmentId: '', date: '', type: '', notes: '' });
  };

  return (
    <form onSubmit={onSubmit} className="bg-white p-4 rounded shadow mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <select
          required
          value={form.equipmentId}
          onChange={e => setForm({ ...form, equipmentId: e.target.value })}
          className="border p-2"
        >
          <option value="">Select Equipment</option>
          {equipment.map(e => (
            <option key={e.id} value={e.id}>{e.name}</option>
          ))}
        </select>

        <input
          type="date"
          required
          value={form.date}
          onChange={e => setForm({ ...form, date: e.target.value })}
          className="border p-2"
        />

        <input
          type="text"
          placeholder="Maintenance Type"
          required
          value={form.type}
          onChange={e => setForm({ ...form, type: e.target.value })}
          className="border p-2"
        />

        <textarea
          placeholder="Notes"
          required
          value={form.notes}
          onChange={e => setForm({ ...form, notes: e.target.value })}
          className="border p-2"
        />
      </div>

      <button
        type="submit"
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
      >
        Add Record
      </button>
    </form>
  );
}
