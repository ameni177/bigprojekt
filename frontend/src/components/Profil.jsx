import React from "react";
import "./Profil.css";

const Profil = () => {
  return (
      <div className="profil">
        <nav className="vertical-navbar">
          <ul>
            <li><button className="vertibar" onClick={() => window.location.href = "/benutzerkonto"}>Benutzerkonto</button></li>
            <li><button className="vertibar" onClick={() => window.location.href = "/zahlungsverlauf"}>Zahlungsverlauf</button></li>
            <li><button className="vertibar" onClick={() => window.location.href = "/nachrichten"}>Nachrichten</button></li>
            <li><button className="vertibar" onClick={() => window.location.href = "/einstellungen"}>Einstellungen</button></li>
          </ul>
        </nav>
      </div>
  );
};

export default Profil;
