import React, { createContext, useState, useEffect } from 'react';
import { load, save } from '../utils/localStorageUtils';
import mockData from '../mockData.json';

export const RentalsContext = createContext();

export const RentalsProvider = ({ children }) => {
  const [rentals, setRentals] = useState(load('rentals', mockData.rentals));

  useEffect(() => {
    save('rentals', rentals);
  }, [rentals]);

  const add = r => setRentals([...rentals, r]);
  const update = u =>
    setRentals(rentals.map(r => (r.id === u.id ? u : r)));
  const remove = id =>
    setRentals(rentals.filter(r => r.id !== id));

  return (
    <RentalsContext.Provider value={{ rentals, add, update, remove }}>
      {children}
    </RentalsContext.Provider>
  );
};
