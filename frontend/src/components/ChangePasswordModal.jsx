import React, { useState } from 'react';
import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: "eu-central-1_u1EUpgENY",
  ClientId: "34b76ra579e5682vh0mjju3pud",
};

const userPool = new CognitoUserPool(poolData);

const ChangePasswordModal = ({ onClose }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');

  const handleChangePassword = () => {
    const cognitoUser = userPool.getCurrentUser();

    if (cognitoUser) {
      cognitoUser.getSession((err, session) => {
        if (err) {
          console.error("Fehler beim Abrufen der Sitzung:", err);
          setError(err.message || JSON.stringify(err));
          return;
        }

        cognitoUser.changePassword(oldPassword, newPassword, (err, result) => {
          if (err) {
            console.error("Fehler beim Ändern des Passworts:", err);
            setError(err.message || JSON.stringify(err));
          } else {
            console.log("Passwort erfolgreich geändert:", result);
            alert("Passwort erfolgreich geändert");
            onClose();
          }
        });
      });
    } else {
      console.error("Benutzer ist nicht authentifiziert");
      setError("Benutzer ist nicht authentifiziert");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Passwort ändern</h2>
        <input
          type="password"
          placeholder="Altes Passwort"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Neues Passwort"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        {error && <p className="error">{error}</p>}
        <div className="modal-buttons">
          <button onClick={() => onClose()}>Abbrechen</button>
          <button onClick={handleChangePassword}>Speichern</button>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
