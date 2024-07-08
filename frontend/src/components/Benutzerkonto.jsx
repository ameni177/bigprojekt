import React, { useState, useEffect } from 'react';
import './Benutzerkonto.css';
import Profil from './Profil.jsx';
import EditEmailModal from './EditEmailModal.jsx';
import EditNameModal from './EditNameModal.jsx';
import ChangePasswordModal from './ChangePasswordModal.jsx'; // Importieren Sie die ChangePasswordModal-Komponente
import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: "eu-central-1_u1EUpgENY",
  ClientId: "34b76ra579e5682vh0mjju3pud",
};

const userPool = new CognitoUserPool(poolData);

const Benutzerkonto = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false); // Zustand für Passwortänderung

  useEffect(() => {
    const emailFromLocalStorage = localStorage.getItem('userEmail');
    const nameFromLocalStorage = localStorage.getItem('userName');
    if (emailFromLocalStorage) {
      setEmail(emailFromLocalStorage);
    }
    if (nameFromLocalStorage) {
      setName(nameFromLocalStorage);
    }
  }, []);

  const handleEditEmailClick = () => {
    setIsEditingEmail(true);
  };

  const handleEditNameClick = () => {
    setIsEditingName(true);
  };

  const handleChangePasswordClick = () => {
    setIsChangingPassword(true);
  };

  const handleCloseEmailModal = (newEmail) => {
    if (newEmail !== null) {
      setEmail(newEmail);
    }
    setIsEditingEmail(false);
  };

  const handleCloseNameModal = (newName) => {
    if (newName !== null) {
      setName(newName);
    }
    setIsEditingName(false);
  };

  const handleClosePasswordModal = () => {
    setIsChangingPassword(false);
  };

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
            <button onClick={handleEditEmailClick}>Bearbeiten</button>
          </div>
          <div className="name-container">
            <h3>Name:</h3>
            <p>{name}</p>
            <button onClick={handleEditNameClick}>Bearbeiten</button>
          </div>
          <div className="password-container">
            <h3>Passwort:</h3>
            <button onClick={handleChangePasswordClick}>Passwort ändern</button>
          </div>
        </div>
      </div>
      {isEditingEmail && <EditEmailModal email={email} onClose={handleCloseEmailModal} />}
      {isEditingName && <EditNameModal name={name} onClose={handleCloseNameModal} />}
      {isChangingPassword && <ChangePasswordModal onClose={handleClosePasswordModal} />}
    </div>
  );
};

export default Benutzerkonto;
