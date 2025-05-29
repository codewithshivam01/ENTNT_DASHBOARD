import React, { createContext, useState, useEffect } from 'react';
import { load, save } from '../utils/localStorageUtils';
import { v4 as uuid } from 'uuid';

export const NotificationsContext = createContext();

export const NotificationsProvider = ({ children }) => {
  const [notifications, setNotifications] = useState(
    load('notifications', [])
  );

  useEffect(() => {
    save('notifications', notifications);
  }, [notifications]);

  const addNotification = message => {
    const n = { id: uuid(), message, date: new Date().toISOString() };
    setNotifications(prev => [n, ...prev]);
  };

  const removeNotification = id => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <NotificationsContext.Provider
      value={{ notifications, addNotification, removeNotification }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};
