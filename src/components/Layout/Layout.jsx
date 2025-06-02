
import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import Sidebar from './Sidebar';

export default function Layout() {
  return (
    <div className="flex flex-col h-screen">
      <NavBar />

      <div className="flex flex-1 overflow-hidden">
        {/* <Sidebar /> */}
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 pt-16 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}




