import React from "react";
import { Link } from "react-router-dom";
import "./Profil.css";

const Profil = () => {
  return (
    <nav className="vertical-navbar">
      <ul>
        <li><Link to="/benutzerkonto" className="vertibar">Benutzerkonto</Link></li>
        <li><Link to="/nachrichten" className="vertibar">Benachrichtigungen</Link></li>
        <li><Link to="/jitsimeetcomponent">Jitsi Meet</Link></li>
      </ul>
    </nav>
  );
};

export default Profil;
