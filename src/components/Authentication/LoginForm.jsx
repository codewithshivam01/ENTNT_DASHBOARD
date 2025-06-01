import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

export default function LoginForm() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const onSubmit = e => {
    e.preventDefault();
    if (!login(email, password)) {
      setError('Invalid credentials');
    }
  };

  return (
    <form onSubmit={onSubmit} className="max-w-sm mx-auto p-4">
      {error && <div className="text-red-600">{error}</div>}
      <div>
      
        <label>Email</label>
        <input
          type="email"
          className="w-full border p-2"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mt-4">
        <label>Password</label>
        <input
          type="password"
          className="w-full border p-2"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="mt-6 w-full bg-blue-600 text-white p-2">
        Log In
      </button>
    </form>
  );
}
