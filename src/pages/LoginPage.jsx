import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/Authentication/LoginForm';

export default function LoginPage() {
  const { user } = useContext(AuthContext);
  const nav = useNavigate();

  useEffect(() => {
    if (user) nav('/dashboard');
  }, [user]);

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <LoginForm />
    </div>
  );
}
