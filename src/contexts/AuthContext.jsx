import React, { createContext, useState, useEffect } from 'react';
import { load, save } from '../utils/localStorageUtils';
import mockData from '../mockData.json';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(load('session', null));
  const users = load('users', mockData.users);

  const login = (email, password) => {
    const u = users.find(u => u.email === email && u.password === password);
    if (u) {
      setUser(u);
      save('session', u);
      return true;
    }
    return false;
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem('session');
  };

  // initialize users LS if missing
  useEffect(() => { save('users', users); }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
