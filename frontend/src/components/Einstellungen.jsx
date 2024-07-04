import React from 'react';
import './Einstellungen.css';
import Profil from './Profil.jsx'

const Einstellungen = () => {
    return (
        <div className="benutzerkonto-container">
          <Profil />
          <div className="content-container">
            <div className="header-content-wrapper">
              <div className="header-content">
                <h1>Einstellungen</h1>
              </div>
            </div>
            <div className="main-content">
              <div>
                <h2>Einstellungen-Inhalt</h2>
              </div>
            </div>
          </div>
        </div>
      );
    };
export default Einstellungen;