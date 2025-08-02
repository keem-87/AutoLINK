// Navbarjs
// This component provides navigation links for the application.
// It uses react-router-dom's Link component to switch between pages without
// reloading the browser. Additional links can be added as you build more pages.

import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/login">Login</Link></li>
        {/* Placeholder for future navigation items (booking, profile, admin) */}
      </ul>
    </nav>
  );
}

export default Navbar;
