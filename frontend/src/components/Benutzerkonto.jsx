import React from 'react';
import './Benutzerkonto.css';
import Profil from './Profil.jsx';

const Benutzerkonto = () => {
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
          <div>
            <h2>Benutzerkonto-Inhalt</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Benutzerkonto;
