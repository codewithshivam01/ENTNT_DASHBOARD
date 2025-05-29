import React, { useState, useContext, useEffect } from 'react';
import { EquipmentContext } from '../../contexts/EquipmentContext';
import { useNavigate, useParams } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

export default function EquipmentForm() {
  const { add, update, equipment } = useContext(EquipmentContext);
  const [form, setForm] = useState({ name: '', category: '', condition: '', status: 'Available' });
  const nav = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id && id !== 'new') {
      const ex = equipment.find(e => e.id === id);
      if (ex) setForm(ex);
    }
  }, [id]);

  const onSubmit = e => {
    e.preventDefault();
    if (id === 'new') {
      add({ ...form, id: uuid() });
    } else {
      update(form);
    }
    nav('/equipment');
  };

  return (
    <form onSubmit={onSubmit} className="max-w-lg">
      {['name','category','condition','status'].map(field => (
        <div key={field} className="mb-4">
          <label className="block capitalize">{field}</label>
          <input
            className="w-full border p-2"
            value={form[field]}
            onChange={e => setForm({ ...form, [field]: e.target.value })}
            required
          />
        </div>
      ))}
      <button type="submit" className="bg-green-600 text-white px-4 py-2">
        {id==='new' ? 'Add' : 'Save'}
      </button>
    </form>
  );
}
