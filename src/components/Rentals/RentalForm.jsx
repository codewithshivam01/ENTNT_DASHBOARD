import { useState, useContext, useEffect } from 'react';
import { RentalsContext } from '../../contexts/RentalsContext';
import { EquipmentContext } from '../../contexts/EquipmentContext';
import { NotificationsContext } from '../../contexts/NotificationsContext';
import { AuthContext } from '../../contexts/AuthContext';
import { v4 as uuid } from 'uuid';
import { load } from '../../utils/localStorageUtils';
import { format } from 'date-fns';

export default function RentalForm() {
  const { add } = useContext(RentalsContext);
  const { equipment, update: updateEquipment } = useContext(EquipmentContext);
  const { addNotification } = useContext(NotificationsContext);
  const { user } = useContext(AuthContext);

  // load hardcoded users (persisted in LS)
  const users = load('users', []);

  // Today's date in YYYY-MM-DD format
  const today = format(new Date(), 'yyyy-MM-dd');

  // form state
  const [form, setForm] = useState({
    customerId: user.role === 'Customer' ? user.id : '',
    equipmentId: '',
    startDate: '',
    endDate: '',
    status: 'Reserved'
  });

  // If the logged-in user is a customer, ensure the form.customerId is fixed
  useEffect(() => {
    if (user.role === 'Customer') {
      setForm((prev) => ({ ...prev, customerId: user.id }));
    }
  }, [user]);

  const onSubmit = e => {
    e.preventDefault();

    // Validate: startDate must be today or later, endDate must be >= startDate
    if (form.startDate < today) {
      alert('Start date cannot be in the past.');
      return;
    }
    if (form.endDate < form.startDate) {
      alert('End date cannot be before start date.');
      return;
    }

    const newRental = { ...form, id: uuid() };
    add(newRental);

    // Mark equipment as "Rented"
    const eq = equipment.find(e => e.id === newRental.equipmentId);
    if (eq) {
      updateEquipment({ ...eq, status: 'Rented' });
    }

    // Notification
    addNotification(
      `Rental created: ${eq?.name || 'Unknown'} from ${newRental.startDate} to ${newRental.endDate}`
    );

    // Reset form (keep customerId if customer)
    setForm({
      customerId: user.role === 'Customer' ? user.id : '',
      equipmentId: '',
      startDate: '',
      endDate: '',
      status: 'Reserved'
    });
  };

  return (
    <form onSubmit={onSubmit} className="bg-white  dark:text-gray-400 dark:bg-gray-800 p-4 rounded shadow mb-6">
      <div className="grid grid-cols-1 dark:text-gray-400 dark:bg-gray-800 md:grid-cols-5 gap-4">
        {/* Customer selector (hidden for Customer role) */}
        {user.role !== 'Customer' ? (
          <select
            required
            value={form.customerId}
            onChange={e => setForm({ ...form, customerId: e.target.value })}
            className="border p-2 rounded dark:text-gray-400 dark:bg-gray-800"
          >
            <option value="">Select Customer</option>
            {users.map(u => (
              <option key={u.id} value={u.id}>
                {u.email}
              </option>
            ))}
          </select>
        ) : (
          <input
            type="hidden"
            value={form.customerId}
          />
        )}

        
        <select
          required
          value={form.equipmentId}
          onChange={e => setForm({ ...form, equipmentId: e.target.value })}
          className="border p-2 rounded dark:text-gray-400 dark:bg-gray-800"
        >
          <option value="">Select Equipment</option>
          {equipment
            .filter(e => e.status === 'Available')
            .map(e => (
              <option key={e.id} value={e.id}>
                {e.name}
              </option>
            ))}
        </select>

        {/* Start date: disable past dates */}
        <input
          type="date"
          required
          value={form.startDate}
          onChange={e => {
            setForm({ 
              ...form, 
              startDate: e.target.value,
              // If endDate is before new startDate, reset endDate
              endDate: form.endDate && e.target.value > form.endDate ? '' : form.endDate
            });
          }}
          min={today}
          className="border p-2 rounded dark:text-gray-400 dark:bg-gray-800"
        />

        <input
          type="date"
          required
          value={form.endDate}
          onChange={e => setForm({ ...form, endDate: e.target.value })}
          min={form.startDate || today}
          className="border p-2 rounded dark:text-gray-400 dark:bg-gray-800"
        />

        {/* Status (only Admin/Staff can change; Customer always "Reserved") */}
        {user.role !== 'Customer' ? (
          <select
            value={form.status}
            onChange={e => setForm({ ...form, status: e.target.value })}
            className="border p-2 rounded dark:text-gray-400 dark:bg-gray-800"
          >
            {['Reserved', 'Rented', 'Returned'].map(s => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        ) : (
          <input
            type="hidden"
            value="Reserved"
            readOnly
          />
        )}
      </div>

      <button
        type="submit"
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
      >
        Create Rental
      </button>
    </form>
  );
}


