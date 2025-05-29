import React, { createContext, useState, useEffect } from 'react';
import { load, save } from '../utils/localStorageUtils';
import mockData from '../mockData.json';

export const EquipmentContext = createContext();

export const EquipmentProvider = ({ children }) => {
  const [equipment, setEquipment] = useState(load('equipment', mockData.equipment));

  useEffect(() => {
    save('equipment', equipment);
  }, [equipment]);

  const add = item => setEquipment([...equipment, item]);
  const update = updated =>
    setEquipment(equipment.map(e => (e.id === updated.id ? updated : e)));
  const remove = id =>
    setEquipment(equipment.filter(e => e.id !== id));

  return (
    <EquipmentContext.Provider value={{ equipment, add, update, remove }}>
      {children}
    </EquipmentContext.Provider>
  );
};
