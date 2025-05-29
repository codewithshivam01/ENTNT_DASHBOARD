import React, { useContext } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { RentalsContext } from '../../contexts/RentalsContext';
import { EquipmentContext } from '../../contexts/EquipmentContext';

const locales = { 'en-US': require('date-fns/locale/en-US') };
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales });

export default function RentalCalendar() {
  const { rentals } = useContext(RentalsContext);
  const { equipment } = useContext(EquipmentContext);

  const events = rentals.map(r => {
    const eq = equipment.find(e => e.id === r.equipmentId);
    return {
      id: r.id,
      title: eq?.name || 'Unknown',
      start: new Date(r.startDate),
      end: new Date(r.endDate)
    };
  });

  return (
    <div className="h-96 bg-white rounded shadow overflow-hidden">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
      />
    </div>
  );
}
