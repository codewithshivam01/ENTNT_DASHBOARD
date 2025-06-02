import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { user, login } = useContext(AuthContext);
  const navigate = useNavigate();

  // If already logged in, redirect to dashboard
  useEffect(() => {
    if (user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(email.trim(), password);
    if (!success) {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-600">
      {/* Card Container */}
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4">
        {/* Logo / Header */}
        <div className="flex flex-col items-center py-6 border-b">
          {/* Replace src with your actual logo if available */}
          <div className="bg-indigo-600 rounded-full p-3 mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m2 0a2 2 0 100-4h-1V5a2 2 0 00-2-2H8a2 2 0 00-2 2v3H5a2 2 0 100 4h1v3a2 2 0 002 2h6a2 2 0 002-2v-3h1a2 2 0 100-4h-1V5z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">
            ENTNT Equipment Rentals
          </h1>
          <p className="text-sm text-gray-500 mt-1">Dashboard Login</p>
        </div>

        <form onSubmit={handleSubmit} className="px-8 py-6">
          {error && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="you@entnt.com"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="********"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-md transition"
          >
            Log In
          </button>
        </form>

        <div className="px-8 py-4 border-t text-center text-sm text-gray-500">
          © {new Date().getFullYear()} ENTNT. All rights reserved.
        </div>
      </div>
    </div>
  );
}
