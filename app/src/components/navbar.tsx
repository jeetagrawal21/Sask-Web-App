import React from 'react';
import '../stylings/navbar.css';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="nav-link" href="#">About</a>
      <a className="nav-link" href="#">Contact us</a>
      <a className="nav-link" href="#">Help</a>
    </nav>
  );
}

export default Navbar; 