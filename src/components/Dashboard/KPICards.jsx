import { useContext } from 'react';
import { EquipmentContext } from '../../contexts/EquipmentContext';
import { RentalsContext }   from '../../contexts/RentalsContext';
import { MaintenanceContext } from '../../contexts/MaintenanceContext';
import { differenceInDays, parseISO } from 'date-fns';

export default function KPICards() {
  const { equipment } = useContext(EquipmentContext);
  const { rentals } = useContext(RentalsContext);
  const { records } = useContext(MaintenanceContext);

  const total = equipment.length;
  const rented = equipment.filter(e => e.status === 'Rented').length;
  const available = total - rented;
  const overdue = rentals.filter(r => {
    const end = parseISO(r.endDate);
    return r.status !== 'Returned' && differenceInDays(new Date(), end) > 0;
  }).length;
  const upcoming = records.filter(r => {
    const d = parseISO(r.date);
    return differenceInDays(d, new Date()) >= 0 && differenceInDays(d, new Date()) <= 7;
  }).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {[
        { label: 'Total Equipment', value: total },
        { label: 'Available', value: available },
        { label: 'Overdue Rentals', value: overdue },
        { label: 'Upcoming Maintenance', value: upcoming }
      ].map(kpi => (
        <div key={kpi.label} className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-sm text-gray-500">{kpi.label}</h3>
          <p className="text-2xl font-bold">{kpi.value}</p>
        </div>
      ))}
    </div>
  );
}
