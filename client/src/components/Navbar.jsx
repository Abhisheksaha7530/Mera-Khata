

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css'; 

function Navbar({ token, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout(); // clears token in App.jsx
      navigate('/login'); // navigate to login
    }
    closeMenu();
  };

  return (
    <nav className="navbar">
      <div className="navbar-header">
        <div className="logo">Mera Khata</div>
        <button className="hamburger" onClick={toggleMenu}>
          &#9776;
        </button>
      </div>

      <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
        {token && (
          <>
            <li><Link to="/dashboard" onClick={closeMenu}>Dashboard</Link></li>
            <li><Link to="/dues" onClick={closeMenu}>Dues</Link></li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        )}
        {!token && (
          <li><Link to="/register" onClick={closeMenu}>Create Account</Link></li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
