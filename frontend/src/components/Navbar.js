// src/components/Navbar.js
import React from 'react';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><a href="/login">Login</a></li>
        <li><a href="/signup">Signup</a></li>
        <li><a href="/dashboard">Dashboard</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;