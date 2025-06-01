import React from 'react';
import NotificationCenter from '../Notifications/NotificationCenter';

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-100 shadow">
      <h1 className="text-xl font-bold">ENTNT Dashboard</h1>
      {/* this renders your notifications list */}
      <NotificationCenter />
    </header>
  );
}
