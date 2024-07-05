import React, { useState, useEffect } from 'react';
import './Footer.css';

function DarkMode() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'enabled') {
      setDarkMode(true);
      document.body.classList.add('dark-mode');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('darkMode', 'enabled');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('darkMode', 'disabled');
    }
  };

  return (
    <div className="DarkMode">
      <Footer onToggleTheme={toggleDarkMode} />
    </div>
  );
}

const Footer = ({ onToggleTheme }) => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="text" >&copy; {new Date().getFullYear()} Ihr Unternehmen. Alle Rechte vorbehalten.</p>
        <button className="dark-mode-button" onClick={onToggleTheme}>Dark Mode</button>
      </div>
    </footer>
  );
};

export default DarkMode;
