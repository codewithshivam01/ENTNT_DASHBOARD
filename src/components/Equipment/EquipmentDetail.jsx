// src/components/Equipment/EquipmentDetail.jsx
import React, { useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { EquipmentContext } from '../../contexts/EquipmentContext';

export default function EquipmentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { equipment, remove } = useContext(EquipmentContext);

  const eq = equipment.find(item => item.id === id);
  if (!eq) return <p className="p-4">Equipment not found.</p>;

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this equipment?')) {
      remove(id);
      navigate('/equipment');
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow rounded p-6">
      <h2 className="text-2xl font-bold mb-4">{eq.name}</h2>
      <div className="space-y-2">
        <p><span className="font-semibold ">Category:</span> {eq.category}</p>
        <p><span className="font-semibold">Condition:</span> {eq.condition}</p>
        <p><span className="font-semibold">Status:</span> {eq.status}</p>
      </div>

      <div className="mt-6 flex space-x-3">
        <Link
          to={`/equipment/${id}/edit`}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Edit
        </Link>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Delete
        </button>
        <Link
          to="/equipment"
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
        >
          Back to List
        </Link>
      </div>
    </div>
  );
}
