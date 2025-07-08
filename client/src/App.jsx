


import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';

import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Dues from './components/Dues';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import LogoHeader from './components/LogoHeader';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem('token'));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <Router>
      <MainLayout token={token} setToken={setToken} onLogout={handleLogout} />
    </Router>
  );
}

function MainLayout({ token, setToken, onLogout }) {
  const location = useLocation();

  // Public route detection
  const publicPaths = ['/login', '/forgot-password'];
  const isResetPath = location.pathname.startsWith('/reset-password');
  const isPublicRoute = publicPaths.includes(location.pathname) || isResetPath;

  return (
    <div className="app-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Show Navbar if logged in, else just the logo */}
      {token ? (
        <Navbar token={token} setToken={setToken} onLogout={onLogout} />
      ) : (
        isPublicRoute && <LogoHeader />
      )}

      <div className="content" style={{ flex: '1' }}>
        <Routes>
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          <Route path="/dashboard" element={token ? <Dashboard token={token} /> : <Navigate to="/login" />} />
          <Route path="/dues" element={token ? <Dues token={token} /> : <Navigate to="/login" />} />

          <Route path="*" element={<Navigate to={token ? '/dashboard' : '/login'} />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
