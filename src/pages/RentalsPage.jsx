import React from 'react';
import RentalForm from '../components/Rentals/RentalForm';
import RentalList from '../components/Rentals/RentalList';
import RentalCalendar from '../components/Rentals/RentalCalendar';

export default function RentalsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Rental Orders</h1>
      <RentalForm />
      <RentalList />
      <h2 className="text-xl mt-8 mb-4">Calendar View</h2>
      <RentalCalendar />
    </div>
  );
}
