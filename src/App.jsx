import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import SignUp from './components/SignUp';
import Login from './components/Login';
import GroupChat from './components/GroupChat';
import TradeCenter from './components/TradeCenter';
import Profile from './components/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import AdminPanel from './components/AdminPanel';
import AdminRoute from './components/AdminRoute';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar /> {/* Keep the top navbar */}
        <main className="main-content">
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            
            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/trade" element={<TradeCenter />} />
              <Route path="/group-chat" element={<GroupChat />} />
              <Route path="/profile" element={<Profile />} />
            </Route>

            {/* Admin route */}
            <Route path="/admin" element={
              <AdminRoute>
                <AdminPanel />
              </AdminRoute>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App; 