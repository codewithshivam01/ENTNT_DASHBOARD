import React, { useContext } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { EquipmentContext } from '../../contexts/EquipmentContext';
import { RentalsContext } from '../../contexts/RentalsContext';

export default function Charts() {
  const { equipment } = useContext(EquipmentContext);
  const { rentals } = useContext(RentalsContext);

  const categoryCounts = equipment.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + 1;
    return acc;
  }, {});
  const catData = Object.entries(categoryCounts).map(([name, value]) => ({
    name,
    value,
  }));

  // Build bar data: [{ name: equipmentName, rented: count }, …]
  const rentCounts = equipment.map((e) => ({
    name: e.name,
    rented: rentals.filter((r) => r.equipmentId === e.id).length,
  }));

  
  const COLORS = ['#3B82F6', '#6366F1', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  return (
    <div className="grid md:grid-cols-2 gap-6 mt-6">
      {/* PIE CHART CARD */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
          Equipment by Category
        </h3>
        <div className="w-full h-64">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={catData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                innerRadius={40}
                paddingAngle={4}
              >
                {catData.map((_, i) => (
                  <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: 'none',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                  borderRadius: '4px',
                }}
                itemStyle={{ color: '#374151' }}
                labelStyle={{ fontWeight: 'bold' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* BAR CHART CARD */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
          Rentals per Equipment
        </h3>
        <div className="w-full h-64">
          <ResponsiveContainer>
            <BarChart data={rentCounts} margin={{ top: 0, right: 20, left: 0, bottom: 0 }}>
              <XAxis
                dataKey="name"
                tick={{ fill: '#4B5563', fontSize: 12 }}
                angle={-30}
                textAnchor="end"
                interval={0}
              />
              <YAxis
                tick={{ fill: '#4B5563', fontSize: 12 }}
                allowDecimals={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: 'none',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                  borderRadius: '4px',
                }}
                itemStyle={{ color: '#374151' }}
                labelStyle={{ fontWeight: 'bold' }}
              />
              <Bar dataKey="rented" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={24} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

