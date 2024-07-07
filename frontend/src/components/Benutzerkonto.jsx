import React, { useState, useEffect } from 'react';
import './Benutzerkonto.css';
import Profil from './Profil.jsx';

const Benutzerkonto = () => {
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Fetch the email from local storage
    const emailFromLocalStorage = localStorage.getItem('userEmail');
    if (emailFromLocalStorage) {
      setEmail(emailFromLocalStorage);
    }
  }, []);

  return (
    <div className="benutzerkonto-container">
      <Profil />
      <div className="content-container">
        <div className="header-content-wrapper">
          <div className="header-content">
            <h1>Benutzerkonto</h1>
          </div>
        </div>
        <div className="main-content">
          <div className="email-container">
            <h3>E-Mail:</h3>
            <p>{email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Benutzerkonto;
