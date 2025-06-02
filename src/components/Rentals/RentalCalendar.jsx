// import React, { useContext } from 'react';
// import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
// import format from 'date-fns/format';
// import parse from 'date-fns/parse';
// import startOfWeek from 'date-fns/startOfWeek';
// import getDay from 'date-fns/getDay';
// import 'react-big-calendar/lib/css/react-big-calendar.css';
// import { RentalsContext } from '../../contexts/RentalsContext';
// import { EquipmentContext } from '../../contexts/EquipmentContext';

// const locales = { 'en-US': require('date-fns/locale/en-US') };
// const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales });

// export default function RentalCalendar() {
//   const { rentals } = useContext(RentalsContext);
//   const { equipment } = useContext(EquipmentContext);

//   const events = rentals.map(r => {
//     const eq = equipment.find(e => e.id === r.equipmentId);
//     return {
//       id: r.id,
//       title: eq?.name || 'Unknown',
//       start: new Date(r.startDate),
//       end: new Date(r.endDate)
//     };
//   });

//   return (
//     <div className="h-96 bg-white rounded shadow overflow-hidden">
//       <Calendar
//         localizer={localizer}
//         events={events}
//         startAccessor="start"
//         endAccessor="end"
//         style={{ height: '100%' }}
//       />
//     </div>
//   );
// }

// src/components/Rentals/RentalCalendar.jsx
// import React, { useState, useContext, useCallback } from 'react';
// import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
// import format from 'date-fns/format';
// import parse from 'date-fns/parse';
// import startOfWeek from 'date-fns/startOfWeek';
// import getDay from 'date-fns/getDay';
// import isBefore from 'date-fns/isBefore';
// import isSameDay from 'date-fns/isSameDay';
// import startOfDay from 'date-fns/startOfDay';
// import 'react-big-calendar/lib/css/react-big-calendar.css';
// import { RentalsContext } from '../../contexts/RentalsContext';
// import { EquipmentContext } from '../../contexts/EquipmentContext';

// const locales = { 'en-US': require('date-fns/locale/en-US') };
// const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales });

// export default function RentalCalendar({ onSelectRange }) {
//   const { rentals } = useContext(RentalsContext);
//   const { equipment } = useContext(EquipmentContext);

//   // Keep track of the current visible date in the calendar.
//   // Start at "today."
//   const today = startOfDay(new Date());
//   const [currentDate, setCurrentDate] = useState(today);

//   // Build events array from rentals
//   const events = rentals.map((r) => {
//     const eq = equipment.find((e) => e.id === r.equipmentId);
//     return {
//       id: r.id,
//       title: eq?.name || 'Unknown',
//       start: new Date(r.startDate),
//       end: new Date(r.endDate),
//     };
//   });

//   // Handler to prevent navigating to a date before today
//   const handleNavigate = useCallback(
//     (newDate, viewAction) => {
//       // If the newDate (start of month/week depending on view) is before today,
//       // then keep the calendar pinned at 'today'.
//       // Otherwise allow navigation to newDate.
//       const normalizeTarget = startOfDay(newDate);
//       if (isBefore(normalizeTarget, today) && !isSameDay(normalizeTarget, today)) {
//         setCurrentDate(today);
//       } else {
//         setCurrentDate(normalizeTarget);
//       }
//     },
//     [today]
//   );

//   // slot selection callback: only allow if slot.start >= today
//   const handleSelectSlot = useCallback(
//     ({ start, end }) => {
//       const slotStart = startOfDay(start);
//       // If user tries to pick a slot whose start is before today, ignore
//       if (isBefore(slotStart, today)) {
//         alert('Cannot select past dates.');
//         return;
//       }
//       // Otherwise, call provided callback (e.g. to populate form) 
//       if (typeof onSelectRange === 'function') {
//         onSelectRange({ start: slotStart, end: startOfDay(end) });
//       }
//     },
//     [today, onSelectRange]
//   );

//   return (
//     <div className="h-96 bg-white dark:bg-gray-800 rounded shadow overflow-hidden">
//       <Calendar
//         localizer={localizer}
//         events={events}
//         startAccessor="start"
//         endAccessor="end"
//         style={{ height: '100%' }}
//         date={currentDate}
//         onNavigate={handleNavigate}
//         selectable
//         onSelectSlot={handleSelectSlot}
//         views={['month', 'week', 'day']}
//         defaultView="month"
//         min={new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0)}
//         // The min prop is for time-of-day; for date views we handle past blocking in handleNavigate/onSelectSlot
//       />
//     </div>
//   );
// }


// src/components/Rentals/RentalCalendar.jsx
import React, { useState, useContext, useCallback } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import isBefore from 'date-fns/isBefore';
import isSameDay from 'date-fns/isSameDay';
import startOfDay from 'date-fns/startOfDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { RentalsContext } from '../../contexts/RentalsContext';
import { EquipmentContext } from '../../contexts/EquipmentContext';

const locales = { 'en-US': require('date-fns/locale/en-US') };
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales });

export default function RentalCalendar({ onSelectRange }) {
  const { rentals } = useContext(RentalsContext);
  const { equipment } = useContext(EquipmentContext);

  // Today's date at midnight
  const today = startOfDay(new Date());
  const [currentDate, setCurrentDate] = useState(today);

  // Build events array from rentals
  const events = rentals.map((r) => {
    const eq = equipment.find((e) => e.id === r.equipmentId);
    return {
      id: r.id,
      title: eq?.name || 'Unknown',
      start: new Date(r.startDate),
      end: new Date(r.endDate),
    };
  });

  // Prevent navigation before today
  const handleNavigate = useCallback(
    (newDate) => {
      const target = startOfDay(newDate);
      if (isBefore(target, today) && !isSameDay(target, today)) {
        setCurrentDate(today);
      } else {
        setCurrentDate(target);
      }
    },
    [today]
  );

  // Only allow selecting slots that start today or later
  const handleSelectSlot = useCallback(
    ({ start, end }) => {
      const slotStart = startOfDay(start);
      if (isBefore(slotStart, today)) {
        alert('Cannot select past dates.');
        return;
      }
      if (typeof onSelectRange === 'function') {
        onSelectRange({ start: slotStart, end: startOfDay(end) });
      }
    },
    [today, onSelectRange]
  );

  // Customize event appearance: soft blue background, white text
  const eventStyleGetter = (event) => ({
    style: {
      backgroundColor: '#3B82F6', // Tailwind blue-500
      borderRadius: '4px',
      border: 'none',
      color: '#ffffff',
      padding: '2px 4px',
      fontSize: '0.85rem',
    },
  });

  // Highlight today's date cell with a faint blue
  const dayPropGetter = (date) => {
    if (isSameDay(startOfDay(date), today)) {
      return { style: { backgroundColor: '#EFF6FF' } }; // Tailwind blue-50
    }
    return { style: {} };
  };

  return (
    <>
      {/* Inline CSS overrides */}
      <style>
        {`
          /* Toolbar background and text color */
          .rbc-toolbar {
            background-color: #ffffff;
            border-bottom: 1px solid #E5E7EB; /* Tailwind gray-200 */
            padding-bottom: 0.5rem;
            margin-bottom: 0.5rem;
          }
          .rbc-toolbar button {
            background: none;
            border: none;
            color: #1F2937; /* Tailwind gray-800 */
            font-weight: 500;
            padding: 0.25rem 0.5rem;
            border-radius: 0.25rem;
            transition: background-color 0.2s;
          }
          .rbc-toolbar button:hover {
            background-color: #F3F4F6; /* Tailwind gray-100 */
            color: #111827; /* Tailwind gray-900 */
          }
          .rbc-toolbar .rbc-btn-group .rbc-active {
            background-color: #3B82F6; /* Tailwind blue-500 */
            color: #ffffff;
          }
          /* Day-of-week header styling */
          .rbc-header {
            background-color: #F9FAFB; /* Tailwind gray-50 */
            color: #374151; /* Tailwind gray-700 */
            font-weight: 600;
          }
          /* Month cell numbers */
          .rbc-month-view .rbc-date-cell {
            color: #374151; /* Tailwind gray-700 */
          }
          /* Weekend shading (optional) */
          .rbc-month-view .rbc-day-bg + .rbc-day-bg {
            /* no change; leave white */
          }
        `}
      </style>

      <div className="h-96 bg-white  rounded shadow overflow-hidden p-2">
        <Calendar 
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100%' }}
          date={currentDate}
          onNavigate={handleNavigate}
          selectable
          onSelectSlot={handleSelectSlot}
          views={['month', 'week', 'day']}
          defaultView="month"
          min={new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0)}
          eventPropGetter={eventStyleGetter}
          dayPropGetter={dayPropGetter}
        />
      </div>
    </>
  );
}

