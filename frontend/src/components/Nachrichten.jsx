import React from 'react';
import './Nachrichten.css';
import Profil from './Profil.jsx'

const Nachrichten = () => {
    return (
        <div className="benutzerkonto-container">
          <Profil />
          <div className="content-container">
            <div className="header-content-wrapper">
              <div className="header-content">
                <h1>Nachrichten</h1>
              </div>
            </div>
            <div className="main-content">
              <div>
                <h2>Nachrichten-Inhalt</h2>
              </div>
            </div>
          </div>
        </div>
      );
    };

export default Nachrichten;