import React from 'react';
import './Zahlungsverlauf.css';
import Profil from './Profil.jsx'

const Zahlungsverlauf = () => {
    return (
        <div className="benutzerkonto-container">
          <Profil />
          <div className="content-container">
            <div className="header-content-wrapper">
              <div className="header-content">
                <h1>Zahlungsverlauf</h1>
              </div>
            </div>
            <div className="main-content">
              <div>
                <h2>Zahlungsverlauf-Inhalt</h2>
              </div>
            </div>
          </div>
        </div>
      );
    };
export default Zahlungsverlauf;