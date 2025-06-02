// src/components/Layout/NavBar.jsx
// import React, { useState, useContext, useEffect, useRef } from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { AuthContext } from '../../contexts/AuthContext';
// import { NotificationsContext } from '../../contexts/NotificationsContext';
// import NotificationCenter from '../Notifications/NotificationCenter';
// import { isAdmin, isStaff } from '../../utils/roleUtils';

// export default function NavBar() {
//   const { user, logout } = useContext(AuthContext);
//   const { notifications } = useContext(NotificationsContext);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [notifOpen, setNotifOpen] = useState(false);
//   const navigate = useNavigate();
//   const notifRef = useRef();
//   const mobileMenuRef = useRef();

//   // Close both dropdowns if clicking outside
//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (notifRef.current && !notifRef.current.contains(event.target)) {
//         setNotifOpen(false);
//       }
//       if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
//         setMobileMenuOpen(false);
//       }
//     }
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   // Define which links to show based on role
//   const links = [
//     { to: '/dashboard', label: 'Dashboard', roles: ['Admin', 'Staff', 'Customer'] },
//     { to: '/equipment', label: 'Equipment', roles: ['Admin', 'Staff'] },
//     { to: '/rentals', label: 'Rentals', roles: ['Admin', 'Staff', 'Customer'] },
//     { to: '/maintenance', label: 'Maintenance', roles: ['Admin', 'Staff'] },
//   ];

//   return (
//     <nav className="bg-indigo-700 text-white fixed w-full z-50 shadow">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16 items-center">

//           {/* ───────── Left: Brand ───────── */}
//           <div className="flex items-center">
//             <span
//               className="text-2xl font-bold cursor-pointer"
//               onClick={() => navigate('/dashboard')}
//             >
//               ENTNT
//             </span>
//           </div>

//           {/* ───────── Center (Desktop): Links ───────── */}
//           <div className="hidden md:flex md:space-x-6 md:items-center">
//             {links.map((link) => {
//               if (!link.roles.includes(user.role)) return null;
//               return (
//                 <NavLink
//                   key={link.to}
//                   to={link.to}
//                   className={({ isActive }) =>
//                     `px-3 py-2 rounded-md text-sm font-medium transition ${
//                       isActive
//                         ? 'bg-indigo-900'
//                         : 'hover:bg-indigo-600'
//                     }`
//                   }
//                 >
//                   {link.label}
//                 </NavLink>
//               );
//             })}
//           </div>

//           {/* ───────── Right: Bell + User + Hamburger ───────── */}
//           <div className="flex items-center space-x-4">

//             {/* Notification Bell */}
//             <div className="relative" ref={notifRef}>
//               <button
//                 onClick={() => {
//                   setNotifOpen((o) => !o);
//                   setMobileMenuOpen(false);
//                 }}
//                 className="p-2 rounded-full hover:bg-indigo-600 focus:outline-none"
//               >
//                 <span className="text-xl">🔔</span>
//                 {notifications.length > 0 && (
//                   <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
//                     {notifications.length}
//                   </span>
//                 )}
//               </button>
//               {notifOpen && (
//                 <div className="absolute right-0 mt-2 w-64 bg-white text-black rounded-md shadow-lg overflow-hidden z-50">
//                   <NotificationCenter />
//                 </div>
//               )}
//             </div>

//             {/* User Email & Logout (Desktop) */}
//             <div className="hidden md:flex md:items-center md:space-x-4">
//               <span className="text-sm">{user.email}</span>
//               <button
//                 onClick={() => {
//                   logout();
//                   navigate('/login', { replace: true });
//                 }}
//                 className="px-3 py-1 bg-red-500 hover:bg-red-600 rounded-md text-sm transition"
//               >
//                 Logout
//               </button>
//             </div>

//             {/* Hamburger (Mobile) */}
//             <div className="md:hidden flex items-center" ref={mobileMenuRef}>
//               <button
//                 onClick={() => {
//                   setMobileMenuOpen((o) => !o);
//                   setNotifOpen(false);
//                 }}
//                 className="p-2 rounded-md hover:bg-indigo-600 focus:outline-none"
//               >
//                 {mobileMenuOpen ? '✕' : '☰'}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ───────── Mobile Menu (slideover) ───────── */}
//       {mobileMenuOpen && (
//         <div className="md:hidden bg-indigo-600 border-t border-indigo-500 shadow-lg">
//           <div className="px-2 pt-2 pb-3 space-y-1">

//             {links.map((link) => {
//               if (!link.roles.includes(user.role)) return null;
//               return (
//                 <NavLink
//                   key={link.to}
//                   to={link.to}
//                   onClick={() => setMobileMenuOpen(false)}
//                   className={({ isActive }) =>
//                     `block px-3 py-2 rounded-md text-base font-medium transition ${
//                       isActive
//                         ? 'bg-indigo-800'
//                         : 'hover:bg-indigo-500'
//                     }`
//                   }
//                 >
//                   {link.label}
//                 </NavLink>
//               );
//             })}

//             <hr className="border-indigo-500 my-2" />

//             <button
//               onClick={() => {
//                 setNotifOpen(true);
//                 setMobileMenuOpen(false);
//               }}
//               className="w-full text-left px-3 py-2 rounded-md text-base hover:bg-indigo-500 transition"
//             >
//               🔔 Notifications ({notifications.length})
//             </button>

//             <div className="px-3 py-2 text-sm">{user.email}</div>

//             <button
//               onClick={() => {
//                 logout();
//                 navigate('/login', { replace: true });
//               }}
//               className="w-full text-left px-3 py-2 bg-red-500 hover:bg-red-600 rounded-md text-base font-medium transition"
//             >
//               Logout
//             </button>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }



// src/components/Layout/NavBar.jsx
// import React, { useState, useContext, useRef, useEffect } from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { AuthContext } from '../../contexts/AuthContext';
// import { NotificationsContext } from '../../contexts/NotificationsContext';
// import NotificationCenter from '../Notifications/NotificationCenter';

// export default function NavBar() {
//   const { user, logout } = useContext(AuthContext);
//   const { notifications } = useContext(NotificationsContext);
//   const [open, setOpen] = useState(false);
//   const dropdownRef = useRef();
//   const navigate = useNavigate();

//   // Close the notification dropdown if clicking outside
//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setOpen(false);
//       }
//     }
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   return (
//     <nav className="bg-white shadow-md fixed w-full z-10">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
//         {/* Left side: Logo and main links */}
//         <div className="flex items-center space-x-8">
//           <span className="text-2xl font-bold text-indigo-600">ENTNT</span>

//           <NavLink
//             to="/dashboard"
//             className={({ isActive }) =>
//               `text-gray-700 hover:text-indigo-600 px-3 py-1 rounded-md transition ${
//                 isActive ? 'bg-indigo-100 text-indigo-800' : ''
//               }`
//             }
//           >
//             Dashboard
//           </NavLink>

//           <NavLink
//             to="/equipment"
//             className={({ isActive }) =>
//               `text-gray-700 hover:text-indigo-600 px-3 py-1 rounded-md transition ${
//                 isActive ? 'bg-indigo-100 text-indigo-800' : ''
//               }`
//             }
//           >
//             Equipment
//           </NavLink>

//           <NavLink
//             to="/rentals"
//             className={({ isActive }) =>
//               `text-gray-700 hover:text-indigo-600 px-3 py-1 rounded-md transition ${
//                 isActive ? 'bg-indigo-100 text-indigo-800' : ''
//               }`
//             }
//           >
//             Rentals
//           </NavLink>

//           <NavLink
//             to="/maintenance"
//             className={({ isActive }) =>
//               `text-gray-700 hover:text-indigo-600 px-3 py-1 rounded-md transition ${
//                 isActive ? 'bg-indigo-100 text-indigo-800' : ''
//               }`
//             }
//           >
//             Maintenance
//           </NavLink>
//         </div>

//         {/* Right side: Notifications + User Info + Logout */}
//         <div className="flex items-center space-x-4">
//           {/* Notification Bell */}
//           <div className="relative" ref={dropdownRef}>
//             <button
//               onClick={() => setOpen((o) => !o)}
//               className="relative p-2 rounded-full hover:bg-gray-100 focus:outline-none"
//             >
//               <span className="text-xl">🔔</span>
//               {notifications.length > 0 && (
//                 <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
//                   {notifications.length}
//                 </span>
//               )}
//             </button>
//             {open && (
//               <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded z-20">
//                 <NotificationCenter />
//               </div>
//             )}
//           </div>

//           {/* Display user email/role */}
//           {user && (
//             <span className="text-gray-600 text-sm">
//               {user.email}
//             </span>
//           )}

//           {/* Logout Button */}
//           {user && (
//             <button
//               onClick={() => {
//                 logout();
//                 navigate('/login');
//               }}
//               className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-sm rounded-md transition"
//             >
//               Logout
//             </button>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }


// // src/components/Layout/NavBar.jsx
// import React, { useContext, useState, useEffect, useRef } from 'react';
// import { NavLink, useNavigate, useLocation } from 'react-router-dom';
// import { AuthContext } from '../../contexts/AuthContext';
// import { NotificationsContext } from '../../contexts/NotificationsContext';
// import NotificationCenter from '../Notifications/NotificationCenter';

// export default function NavBar() {
//   const { user, logout } = useContext(AuthContext);
//   const { notifications } = useContext(NotificationsContext);
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [notifOpen, setNotifOpen] = useState(false);
//   const notifRef = useRef();
//   const mobileMenuRef = useRef();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const links = [
//     { to: '/dashboard', label: 'Dashboard', roles: ['Admin', 'Staff', 'Customer'] },
//     { to: '/equipment', label: 'Equipment', roles: ['Admin', 'Staff'] },
//     { to: '/rentals', label: 'Rentals', roles: ['Admin', 'Staff', 'Customer'] },
//     { to: '/maintenance', label: 'Maintenance', roles: ['Admin', 'Staff'] },
//   ];

//   // Close dropdowns when clicking outside
//   useEffect(() => {
//     function handleClickOutside(e) {
//       if (notifRef.current && !notifRef.current.contains(e.target)) {
//         setNotifOpen(false);
//       }
//       if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
//         setMobileOpen(false);
//       }
//     }
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   return (
//     <nav className="bg-white fixed w-full top-0 z-50 shadow-md">
//       <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

//         {/* Brand */}
//         <div className="text-2xl font-bold text-indigo-600">ENTNT</div>

//         {/* Desktop Nav */}
//         <div className="hidden md:flex items-center gap-4">
//           {links.map(link =>
//             link.roles.includes(user.role) ? (
//               <NavLink
//                 key={link.to}
//                 to={link.to}
//                 className={({ isActive }) =>
//                   `text-sm px-3 py-2 rounded-md font-medium ${
//                     isActive ? 'bg-indigo-100 text-indigo-800' : 'text-gray-700 hover:bg-gray-100 hover:text-indigo-600'
//                   }`
//                 }
//               >
//                 {link.label}
//               </NavLink>
//             ) : null
//           )}

//           {/* Notification Bell */}
//           <div className="relative" ref={notifRef}>
//             <button
//               onClick={() => {
//                 setNotifOpen(prev => !prev);
//                 setMobileOpen(false);
//               }}
//               className="relative p-2 rounded-full hover:bg-gray-100 focus:outline-none"
//             >
//               <span className="text-xl">🔔</span>
//               {notifications.length > 0 && (
//                 <span className="absolute top-0 right-0 px-1 text-xs font-bold text-white bg-red-600 rounded-full">
//                   {notifications.length}
//                 </span>
//               )}
//             </button>
//             {notifOpen && (
//               <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-md overflow-hidden z-30">
//                 <NotificationCenter />
//               </div>
//             )}
//           </div>

//           {/* User Info + Logout */}
//           <span className="text-sm text-gray-600">{user.email}</span>
//           <button
//             onClick={() => {
//               logout();
//               navigate('/login');
//             }}
//             className="bg-red-500 text-white text-sm px-3 py-1 rounded hover:bg-red-600"
//           >
//             Logout
//           </button>
//         </div>

//         {/* Mobile Hamburger */}
//         <div className="md:hidden" ref={mobileMenuRef}>
//           <button onClick={() => {
//             setMobileOpen(prev => !prev);
//             setNotifOpen(false);
//           }} className="text-2xl">
//             {mobileOpen ? '✕' : '☰'}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {mobileOpen && (
//         <div className="md:hidden bg-white border-t px-4 pb-4 pt-2 shadow">
//           {links.map(link =>
//             link.roles.includes(user.role) ? (
//               <button
//                 key={link.to}
//                 onClick={() => {
//                   navigate(link.to);
//                   setMobileOpen(false);
//                 }}
//                 className={`block w-full text-left py-2 px-2 rounded-md ${
//                   location.pathname === link.to
//                     ? 'bg-indigo-100 text-indigo-800'
//                     : 'text-gray-700 hover:bg-gray-100 hover:text-indigo-600'
//                 }`}
//               >
//                 {link.label}
//               </button>
//             ) : null
//           )}

//           <hr className="my-2" />

//           {/* Notifications in mobile */}
//           <button
//             onClick={() => {
//               setNotifOpen(true);
//               setMobileOpen(false);
//             }}
//             className="w-full text-left px-2 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-indigo-600"
//           >
//             🔔 Notifications ({notifications.length})
//           </button>

//           {/* Email */}
//           <div className="px-2 py-2 text-sm text-gray-600">{user.email}</div>

//           {/* Logout */}
//           <button
//             onClick={() => {
//               logout();
//               navigate('/login');
//             }}
//             className="w-full text-left px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//           >
//             Logout
//           </button>
//         </div>
//       )}
//     </nav>
//   );
// }

// src/components/Layout/NavBar.jsx
// src/components/Layout/NavBar.jsx
// src/components/Layout/NavBar.jsx
import React, {
  useState,
  useContext,
  useEffect,
  useRef
} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { NotificationsContext } from '../../contexts/NotificationsContext';
import NotificationCenter from '../Notifications/NotificationCenter';
import { isAdmin, isStaff } from '../../utils/roleUtils';
import { ThemeContext } from '../../index'; // import the ThemeContext we created

export default function NavBar() {
  const { user, logout } = useContext(AuthContext);
  const { notifications } = useContext(NotificationsContext);
  const { isDark, setIsDark } = useContext(ThemeContext);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const navigate = useNavigate();
  const notifRef = useRef();
  const mobileMenuRef = useRef();

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setNotifOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Nav links, filtered by role
  const links = [
    { to: '/dashboard', label: 'Dashboard', roles: ['Admin', 'Staff', 'Customer'] },
    { to: '/equipment', label: 'Equipment', roles: ['Admin', 'Staff', 'Customer'] },
    { to: '/rentals', label: 'Rentals', roles: ['Admin', 'Staff', 'Customer'] },
    { to: '/maintenance', label: 'Maintenance', roles: ['Admin', 'Staff'] },
  ];

  return (
    <nav className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 fixed w-full z-50 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* ───────── Left: Brand ───────── */}
          <div className="flex items-center">
            <span
              className="text-2xl font-bold cursor-pointer"
              onClick={() => navigate('/dashboard')}
            >
              ENTNT
            </span>
          </div>

          {/* ───────── Center (Desktop): Links ───────── */}
          <div className="hidden md:flex md:space-x-6 md:items-center">
            {links.map((link) => {
              if (!link.roles.includes(user.role)) return null;
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium transition
                     ${
                       isActive
                         ? 'bg-indigo-200 text-indigo-900 dark:bg-indigo-700 dark:text-indigo-100'
                         : 'hover:bg-indigo-100 dark:hover:bg-indigo-800'
                     }`
                  }
                >
                  {link.label}
                </NavLink>
              );
            })}
          </div>

          {/* ───────── Right: Bell + Dark Toggle + User + Hamburger ───────── */}
          <div className="flex items-center space-x-4">

            {/* Notification Bell */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => {
                  setNotifOpen((o) => !o);
                  setMobileMenuOpen(false);
                }}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
              >
                <span className="text-xl">🔔</span>
                {notifications.length > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
                    {notifications.length}
                  </span>
                )}
              </button>
              {notifOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 text-black dark:text-white rounded-md shadow-lg overflow-hidden z-50">
                  <NotificationCenter />
                </div>
              )}
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
            >
              {isDark
                ? <span className="text-xl">☀️</span>
                : <span className="text-xl">🌙</span>
              }
            </button>

            {/* User Email & Logout (Desktop) */}
            <div className="hidden md:flex md:items-center md:space-x-4">
              <span className="text-sm">{user.email}</span>
              <button
                onClick={() => {
                  logout();
                  navigate('/login', { replace: true });
                }}
                className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm transition"
              >
                Logout
              </button>
            </div>

            {/* Hamburger (Mobile) */}
            <div className="md:hidden flex items-center" ref={mobileMenuRef}>
              <button
                onClick={() => {
                  setMobileMenuOpen((o) => !o);
                  setNotifOpen(false);
                }}
                className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
              >
                {mobileMenuOpen ? '✕' : '☰'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ───────── Mobile Menu (Slide‐down) ───────── */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-indigo-600 dark:bg-indigo-800 border-t border-indigo-700">
          <div className="px-2 pt-2 pb-3 space-y-1">

            {links.map((link) => {
              if (!link.roles.includes(user.role)) return null;
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md text-base font-medium transition
                     ${
                       isActive
                         ? 'bg-indigo-700 dark:bg-indigo-900 text-white'
                         : 'hover:bg-indigo-500 dark:hover:bg-indigo-700 text-gray-100'
                     }`
                  }
                >
                  {link.label}
                </NavLink>
              );
            })}

            <hr className="border-indigo-500 dark:border-indigo-700 my-2" />

            {/* Notifications Link */}
            <button
              onClick={() => {
                setNotifOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-500 dark:hover:bg-indigo-700 text-gray-100 transition"
            >
              🔔 Notifications ({notifications.length})
            </button>

            <div className="px-3 py-2 text-gray-200 text-sm">
              {user.email}
            </div>

            <button
              onClick={() => {
                logout();
                navigate('/login', { replace: true });
              }}
              className="w-full text-left px-3 py-2 bg-red-500 hover:bg-red-600 rounded-md text-base font-medium text-white transition"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
