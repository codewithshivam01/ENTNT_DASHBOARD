import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/equipment', label: 'Equipment' },
    { to: '/rentals', label: 'Rentals' },
    { to: '/maintenance', label: 'Maintenance' },
  ];

  return (
    <>
      {/* Mobile Hamburger Button */}
      <div className="md:hidden p-4">
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open menu"
          className="text-gray-700 text-2xl"
        >
          ☰
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 w-64 bg-gray-800 text-white transform
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          transition-transform duration-200 ease-in-out
          md:translate-x-0 md:static md:block
        `}
      >
        <div className="p-6 font-bold text-xl border-b border-gray-700">
          ENTNT Dashboard
        </div>
        <nav className="mt-4">
          {links.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `block px-6 py-3 hover:bg-gray-700 ${
                  isActive ? 'bg-gray-700' : ''
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Overlay (mobile only) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
