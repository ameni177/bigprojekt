import React, { useState } from 'react';
import axios from 'axios';
import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: "eu-central-1_u1EUpgENY",
  ClientId: "34b76ra579e5682vh0mjju3pud",
};

const userPool = new CognitoUserPool(poolData);

const EditNameModal = ({ name, onClose }) => {
  const [newName, setNewName] = useState(name);
  const [error, setError] = useState('');

  const handleSave = async () => {
    console.log("Speichern-Button geklickt");
    const cognitoUser = userPool.getCurrentUser();

    if (cognitoUser) {
      cognitoUser.getSession(async (err, session) => {
        if (err) {
          console.error("Fehler beim Abrufen der Sitzung:", err);
          setError(err.message || JSON.stringify(err));
          return;
        }

        console.log("Sitzung erfolgreich abgerufen:", session);

        // Hier fügen wir die Logik hinzu, um den neuen Nicknamen in Ihrer Datenbank zu speichern
        try {
          const response = await axios.post('https://your-api-endpoint.com/save-nickname', {
            userId: cognitoUser.getUsername(),
            nickname: newName
          });

          console.log("Nickname erfolgreich in der Datenbank gespeichert:", response.data);
          localStorage.setItem('userName', newName);
          onClose(newName);
        } catch (dbError) {
          console.error("Fehler beim Speichern des Nicknamens in der Datenbank:", dbError);
          setError("Fehler beim Speichern des Nicknamens. Bitte versuchen Sie es später erneut.");
        }
      });
    } else {
      console.error("Benutzer ist nicht authentifiziert");
      setError("Benutzer ist nicht authentifiziert");
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
