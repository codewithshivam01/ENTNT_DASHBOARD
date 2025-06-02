// import React from 'react';
// import RentalForm from '../components/Rentals/RentalForm';
// import RentalList from '../components/Rentals/RentalList';
// import RentalCalendar from '../components/Rentals/RentalCalendar';

// export default function RentalsPage() {
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl mb-4">Rental Orders</h1>
//       <RentalForm />
//       <RentalList />
//       <h2 className="text-xl mt-8 mb-4">Calendar View</h2>
//       <RentalCalendar />
//     </div>
//   );
// }
// src/pages/RentalsPage.jsx
// import React, { useState } from 'react';
// import RentalForm from '../components/Rentals/RentalForm';
// import RentalList from '../components/Rentals/RentalList';
// import RentalCalendar from '../components/Rentals/RentalCalendar';

// export default function RentalsPage() {
//   const [selectedRange, setSelectedRange] = useState({ start: null, end: null });

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Rentals</h1>

//       {/* If the user clicks on a date range in the calendar, we fill the form */}
//       <RentalCalendar onSelectRange={({ start, end }) => setSelectedRange({ start, end })} />

//       <RentalForm selectedRange={selectedRange} resetRange={() => setSelectedRange({ start: null, end: null })} />

//       <RentalList />
//     </div>
//   );
// }


// src/pages/RentalsPage.jsx
import React, { useState } from 'react';
import RentalForm from '../components/Rentals/RentalForm';
import RentalList from '../components/Rentals/RentalList';
import RentalCalendar from '../components/Rentals/RentalCalendar';

export default function RentalsPage() {
  // Keep track of the date range selected on the calendar
  const [selectedRange, setSelectedRange] = useState({ start: null, end: null });

  return (
    <div className="space-y-8">
      {/* Page header */}
      <h1 className="text-2xl  dark:text-gray-400 font-bold">Rentals</h1>

      {/* Rental Form (passes selectedRange if user picked on calendar) */}
      <div className="bg-white dark:text-gray-400 dark:bg-gray-800 p-6 rounded shadow">
        <RentalForm selectedRange={selectedRange} resetRange={() => setSelectedRange({ start: null, end: null })} />
      </div>

      {/* Rental List */}
      <div className="bg-white  dark:text-gray-400 dark:bg-gray-800 p-6 rounded shadow">
        <RentalList />
      </div>

      {/* Calendar (fills its container) */}
      <div>
        <h2 className="text-xl dark:text-gray-400 font-semibold mb-4">Rental Calendar & Agenda</h2>
        <RentalCalendar onSelectRange={(range) => setSelectedRange(range)} />
      </div>
    </div>
  );
}

