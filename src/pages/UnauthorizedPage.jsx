// src/pages/UnauthorizedPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function UnauthorizedPage() {
  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">403 — Unauthorized</h1>
      <p className="mb-6">You do not have permission to view this page.</p>
      <Link
        to="/"
        className="inline-block px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
      >
        Back to Dashboard
      </Link>
    </div>
  );
}
