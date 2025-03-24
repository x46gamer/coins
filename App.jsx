import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import SignUp from './components/SignUp';
import Login from './components/Login';
import GroupChat from './components/GroupChat';
import TradeCenter from './components/TradeCenter';
import './styles/main.css';
import { UserProvider } from './contexts/UserContext';

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="app">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/group-chat" element={<GroupChat />} />
            <Route path="/trade" element={<TradeCenter />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App; 