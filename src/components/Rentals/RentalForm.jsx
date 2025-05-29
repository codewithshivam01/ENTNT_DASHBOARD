import React, { useState, useContext } from 'react';
import { RentalsContext } from '../../contexts/RentalsContext';
import { EquipmentContext } from '../../contexts/EquipmentContext';
import { v4 as uuid } from 'uuid';
import { load } from '../../utils/localStorageUtils';

export default function RentalForm() {
  const { add } = useContext(RentalsContext);
  const { equipment } = useContext(EquipmentContext);
  const users = load('users', []);
  const [form, setForm] = useState({
    customerId: '',
    equipmentId: '',
    startDate: '',
    endDate: '',
    status: 'Reserved'
  });

  const onSubmit = e => {
    e.preventDefault();
    add({ ...form, id: uuid() });
    setForm({
      customerId: '',
      equipmentId: '',
      startDate: '',
      endDate: '',
      status: 'Reserved'
    });
  };

  return (
    <form onSubmit={onSubmit} className="bg-white p-4 rounded shadow mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <select
          required
          value={form.customerId}
          onChange={e => setForm({ ...form, customerId: e.target.value })}
          className="border p-2"
        >
          <option value="">Select Customer</option>
          {users.map(u => (
            <option key={u.id} value={u.id}>{u.email}</option>
          ))}
        </select>

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
          value={form.startDate}
          onChange={e => setForm({ ...form, startDate: e.target.value })}
          className="border p-2"
        />
        <input
          type="date"
          required
          value={form.endDate}
          onChange={e => setForm({ ...form, endDate: e.target.value })}
          className="border p-2"
        />
        <select
          value={form.status}
          onChange={e => setForm({ ...form, status: e.target.value })}
          className="border p-2"
        >
          {['Reserved','Rented','Returned'].map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Create Rental
      </button>
    </form>
  );
}
