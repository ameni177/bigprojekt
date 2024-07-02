import React, { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [menuToggle, setMenuToggle] = useState(false);

  const toggleMenu = () => {
    setMenuToggle(!menuToggle);
  };

  return (
    <>
      <nav id="navbar">
        <div className="nav-wrapper">
          <div className="logo">
            <a href="#home"><i className="fas fa-chess-knight"></i> Logo</a>
          </div>
          <ul id="menu">
            <li><a href="#home">Home</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
      </nav>
      <div className={`menuIcon ${menuToggle ? 'toggle' : ''}`} onClick={toggleMenu}>
        <span className="icon icon-bars"></span>
        <span className="icon icon-bars overlay"></span>
      </div>
      <div className={`overlay-menu ${menuToggle ? 'open' : ''}`}>
        <ul id="menu">
          <li><a href="#home">Home</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
