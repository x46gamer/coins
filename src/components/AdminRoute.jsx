import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

function AdminRoute({ children }) {
  const { user, isAdmin } = useUser();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!isAdmin) {
    return <Navigate to="/" />;
  }

  return children;
}

export default AdminRoute; 