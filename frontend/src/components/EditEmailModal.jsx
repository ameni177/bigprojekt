import React, { useState } from 'react';
import { CognitoUserPool, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import AWS from 'aws-sdk';

const poolData = {
  UserPoolId: "eu-central-1_u1EUpgENY",
  ClientId: "34b76ra579e5682vh0mjju3pud",
};

const userPool = new CognitoUserPool(poolData);

const EditNameModal = ({ name, onClose }) => {
  const [newName, setNewName] = useState(name);
  const [error, setError] = useState('');

  const handleSave = () => {
    console.log("Speichern-Button geklickt");
    const cognitoUser = userPool.getCurrentUser();

    if (cognitoUser) {
      cognitoUser.getSession((err, session) => {
        if (err) {
          console.error("Fehler beim Abrufen der Sitzung:", err);
          setError(err.message || JSON.stringify(err));
          return;
        }

        console.log("Sitzung erfolgreich abgerufen:", session);

        const attributeList = [];
        const attribute = new CognitoUserAttribute({
          Name: 'name',
          Value: newName,
        });
        attributeList.push(attribute);

        cognitoUser.updateAttributes(attributeList, (err, result) => {
          if (err) {
            console.error("Fehler beim Aktualisieren der Attribute:", err);
            setError(err.message || JSON.stringify(err));
          } else {
            console.log("Attribute erfolgreich aktualisiert:", result);
            localStorage.setItem('userName', newName);
            onClose(newName);
          }
        });
      });
    } else {
      console.error("Benutzer ist nicht authentifiziert");
      setError("User is not authenticated");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Benutzernamen bearbeiten</h2>
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        {error && <p className="error">{error}</p>}
        <div className="modal-buttons">
          <button onClick={handleSave}>Speichern</button>
          <button onClick={() => onClose(null)}>Abbrechen</button>
        </div>
      </div>
    </div>
  );
};

export default EditNameModal;
