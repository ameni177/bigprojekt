import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="text">&copy; {new Date().getFullYear()} WATCH US. All Rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
