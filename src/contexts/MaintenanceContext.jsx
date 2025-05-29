import React, { createContext, useState, useEffect } from 'react';
import { load, save } from '../utils/localStorageUtils';
import mockData from '../mockData.json';

export const MaintenanceContext = createContext();

export const MaintenanceProvider = ({ children }) => {
  const [records, setRecords] = useState(load('maintenance', mockData.maintenance));

  useEffect(() => {
    save('maintenance', records);
  }, [records]);

  const add = m => setRecords([...records, m]);
  const update = u =>
    setRecords(records.map(r => (r.id === u.id ? u : r)));
  const remove = id =>
    setRecords(records.filter(r => r.id !== id));

  return (
    <MaintenanceContext.Provider value={{ records, add, update, remove }}>
      {children}
    </MaintenanceContext.Provider>
  );
};
