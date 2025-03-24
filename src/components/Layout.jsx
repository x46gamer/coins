import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useUser } from '../contexts/UserContext';

const Layout = ({ children }) => {
  const { user } = useUser();

  if (!user) {
    return <div className="auth-container">{children}</div>;
  }

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <main className="content-area">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout; 