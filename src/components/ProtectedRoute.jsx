// import React, { useContext } from 'react';
// import { AuthContext } from '../contexts/AuthContext';
// import { Navigate, Outlet } from 'react-router-dom';

// const ProtectedRoute = () => {
//   const { user } = useContext(AuthContext);
//   return user ? <Outlet /> : <Navigate to="/login" />;
// };

// export default ProtectedRoute;

// src/components/ProtectedRoute.jsx
import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

/**
 * allowedRoles: array of role strings (e.g. ['Admin','Staff']).
 * If omitted, any authenticated user is allowed.
 */
export default function ProtectedRoute({ allowedRoles }) {
  const { user } = useContext(AuthContext);

  // 1) Not logged in → send to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 2) logged in but not in allowedRoles → unauthorized
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // 3) OK
  return <Outlet />;
}





