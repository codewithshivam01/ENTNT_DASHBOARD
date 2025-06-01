// import React, { createContext, useState, useEffect } from 'react';
// import { load, save } from '../utils/localStorageUtils';
// import mockData from '../mockData.json';

// export const EquipmentContext = createContext();

// export const EquipmentProvider = ({ children }) => {
//   const [equipment, setEquipment] = useState(load('equipment', mockData.equipment));

//   useEffect(() => {
//     save('equipment', equipment);
//   }, [equipment]);

//   const add = item => setEquipment([...equipment, item]);
//   const update = updated =>
//     setEquipment(equipment.map(e => (e.id === updated.id ? updated : e)));
//   const remove = id =>
//     setEquipment(equipment.filter(e => e.id !== id));

//   return (
//     <EquipmentContext.Provider value={{ equipment, add, update, remove }}>
//       {children}
//     </EquipmentContext.Provider>
//   );
// };
// src/contexts/EquipmentContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { load, save } from '../utils/localStorageUtils';
import mockData from '../mockData.json';

export const EquipmentContext = createContext();

export const EquipmentProvider = ({ children }) => {
  // 1) Load existing list (or mock data if none)
  const [equipment, setEquipment] = useState(() => {
    const stored = load('equipment', null);
    return stored !== null ? stored : mockData.equipment;
  });

  // 2) Persist whenever equipment changes
  useEffect(() => {
    save('equipment', equipment);
  }, [equipment]);

  // 3) CRUD operations
  const add = newItem => {
    setEquipment(prev => [...prev, newItem]);
  };
  const update = updatedItem => {
    setEquipment(prev =>
      prev.map(item => (item.id === updatedItem.id ? updatedItem : item))
    );
  };
  const remove = id => {
    setEquipment(prev => prev.filter(item => item.id !== id));
  };

  return (
    <EquipmentContext.Provider value={{ equipment, add, update, remove }}>
      {children}
    </EquipmentContext.Provider>
  );
};
