import React, { useContext } from 'react';
import { EquipmentContext } from '../../contexts/EquipmentContext';
import { Link } from 'react-router-dom';

export default function EquipmentList() {
  const { equipment, remove } = useContext(EquipmentContext);

  return (
    <div>
      <Link to="/equipment/new" className="btn">Add Equipment</Link>
      <table className="w-full mt-4">
        <thead>
          <tr>
            {['Name','Category','Condition','Status','Actions'].map(h => <th key={h}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {equipment.map(e => (
            <tr key={e.id}>
              <td>{e.name}</td>
              <td>{e.category}</td>
              <td>{e.condition}</td>
              <td>{e.status}</td>
              <td>
                <Link to={`/equipment/${e.id}`} className="mr-2">View</Link>
                <Link to={`/equipment/${e.id}/edit`} className="mr-2">Edit</Link>
                <button onClick={() => remove(e.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
