import React, { useContext } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { EquipmentContext } from '../../contexts/EquipmentContext';
import { RentalsContext } from '../../contexts/RentalsContext';

export default function Charts() {
  const { equipment } = useContext(EquipmentContext);
  const { rentals } = useContext(RentalsContext);

  // Pie: category distribution
  const catData = Object.values(equipment.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + 1;
    return acc;
  }, {})).map((count, cat) => ({ name: cat, value: count }));

  // Bar: rentals per equipment
  const rentCounts = equipment.map(e => ({
    name: e.name,
    rented: rentals.filter(r => r.equipmentId === e.id).length
  }));

  return (
    <div className="grid md:grid-cols-2 gap-6 mt-6">
      <PieChart width={300} height={300}>
        <Pie data={catData} dataKey="value" nameKey="name" outerRadius={80}>
          {catData.map((_, i) => <Cell key={i} />)}
        </Pie>
      </PieChart>
      <BarChart width={500} height={300} data={rentCounts}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="rented" />
      </BarChart>
    </div>
  );
}
