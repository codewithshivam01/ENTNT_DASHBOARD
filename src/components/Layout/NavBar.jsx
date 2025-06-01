// src/components/Layout/NavBar.jsx
import React, { useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

export default function NavBar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const links = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/equipment', label: 'Equipment' },
    { to: '/rentals', label: 'Rentals' },
    { to: '/maintenance', label: 'Maintenance' },
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          
          {/* Branding */}
          <div className="flex items-center">
            <span className="font-bold text-xl text-indigo-600">ENTNT</span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex md:space-x-6 md:items-center">
            {links.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition 
                   ${isActive 
                     ? 'bg-indigo-100 text-indigo-700' 
                     : 'text-gray-700 hover:bg-gray-100'}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Right-side: User & Auth */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {user ? (
              <>
                <span className="text-gray-600 text-sm">
                  {user.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <NavLink
                to="/login"
                className="px-3 py-2 bg-green-500 text-white text-sm rounded-md hover:bg-green-600 transition"
              >
                Login
              </NavLink>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMenuOpen(o => !o)}
              className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
            >
              {menuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Links */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 py-3 space-y-1">
            {links.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium transition 
                   ${isActive 
                     ? 'bg-indigo-100 text-indigo-700' 
                     : 'text-gray-700 hover:bg-gray-100'}`
                }
              >
                {link.label}
              </NavLink>
            ))}

            <div className="mt-2 border-t border-gray-200 pt-2">
              {user ? (
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 rounded-md text-base text-red-600 hover:bg-gray-100 transition"
                >
                  Logout
                </button>
              ) : (
                <NavLink
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base text-green-600 hover:bg-gray-100 transition"
                >
                  Login
                </NavLink>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
);
}
