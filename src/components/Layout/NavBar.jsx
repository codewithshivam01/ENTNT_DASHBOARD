import React, { useState, useContext, useEffect, useRef } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { NotificationsContext } from "../../contexts/NotificationsContext";
import NotificationCenter from "../Notifications/NotificationCenter";
import { ThemeContext } from "../../index";

export default function NavBar() {
  const { user, logout } = useContext(AuthContext);
  const { notifications, clearNotifications } = useContext(NotificationsContext);
  const { isDark, setIsDark } = useContext(ThemeContext);
  const location = useLocation();

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
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const links = [
    { to: "/dashboard", label: "Dashboard", roles: ["Admin", "Staff", "Customer"] },
    { to: "/equipment", label: "Equipment", roles: ["Admin", "Staff", "Customer"] },
    { to: "/rentals", label: "Rentals", roles: ["Admin", "Staff", "Customer"] },
    { to: "/maintenance", label: "Maintenance", roles: ["Admin", "Staff"] },
  ];

  const filteredLinks = links.filter(link => link.roles.includes(user.role));

  return (
    <nav className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 fixed w-full z-50 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Left: Brand */}
          <div className="flex items-center">
            <span
              className="text-2xl font-bold cursor-pointer"
              onClick={() => navigate("/dashboard")}
            >
              ENTNT
            </span>
          </div>

          {/* Center (Desktop): Links */}
          <div className="hidden md:flex md:space-x-6 md:items-center">
            {filteredLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition
                  ${
                    isActive
                      ? "bg-indigo-200 text-indigo-900 dark:bg-indigo-700 dark:text-indigo-100"
                      : "hover:bg-indigo-100 dark:hover:bg-indigo-800"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Right: Controls */}
          <div className="flex items-center space-x-4">
            {/* Notification Bell */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => {
                  setNotifOpen((o) => !o);
                  setMobileMenuOpen(false);
                  if (!notifOpen && notifications.length > 0) {
                    //clearNotifications();
                  }
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
                  <NotificationCenter onClose={() => setNotifOpen(false)} />
                </div>
              )}
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
            >
              {isDark ? "☀️" : "🌙"}
            </button>

            {/* User Email & Logout (Desktop) */}
            <div className="hidden md:flex md:items-center md:space-x-4">
              <span className="text-sm">{user.email}</span>
              <button
                onClick={() => {
                  logout();
                  navigate("/login", { replace: true });
                }}
                className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm transition"
              >
                Logout
              </button>
            </div>

            {/* Hamburger (Mobile) */}
            <div className="md:hidden flex items-center" ref={mobileMenuRef}>
              <button
                onClick={() => setMobileMenuOpen((o) => !o)}
                className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? "✕" : "☰"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden bg-indigo-600 dark:bg-indigo-800 border-t border-indigo-700 transition-all duration-300 ease-in-out ${
        mobileMenuOpen ? "max-h-screen" : "max-h-0 overflow-hidden"
      }`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          {filteredLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-base font-medium transition
                ${
                  isActive
                    ? "bg-indigo-700 dark:bg-indigo-900 text-white"
                    : "hover:bg-indigo-500 dark:hover:bg-indigo-700 text-gray-100"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

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

          <div className="px-3 py-2 text-gray-200 text-sm">{user.email}</div>

          <button
            onClick={() => {
              logout();
              navigate("/login", { replace: true });
            }}
            className="w-full text-left px-3 py-2 bg-red-500 hover:bg-red-600 rounded-md text-base font-medium text-white transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}