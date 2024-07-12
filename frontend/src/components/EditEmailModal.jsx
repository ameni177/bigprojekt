import React, { useState } from 'react';
import { CognitoUserPool, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import AWS from 'aws-sdk';

const poolData = {
  UserPoolId: "eu-central-1_u1EUpgENY",
  ClientId: "34b76ra579e5682vh0mjju3pud",
};

const userPool = new CognitoUserPool(poolData);

const EditEmailModal = ({ email, onClose }) => {
  const [newEmail, setNewEmail] = useState(email);
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');
  const [showVerification, setShowVerification] = useState(false);

  const handleSave = () => {
    const cognitoUser = userPool.getCurrentUser();

    if (cognitoUser) {
      cognitoUser.getSession((err, session) => {
        if (err) {
          setError(err.message || JSON.stringify(err));
          return;
        }

        const attributeList = [];
        const attribute = new CognitoUserAttribute({
          Name: 'email',
          Value: newEmail,
        });
        attributeList.push(attribute);

        cognitoUser.updateAttributes(attributeList, (err, result) => {
          if (err) {
            setError(err.message || JSON.stringify(err));
          } else {
            setShowVerification(true);
          }
        });
      });
    } else {
      setError("User is not authenticated");
    }
  };

  const handleVerify = () => {
    const cognitoUser = userPool.getCurrentUser();

    if (cognitoUser) {
      cognitoUser.getSession((err, session) => {
        if (err) {
          setError(err.message || JSON.stringify(err));
          return;
        }

        cognitoUser.verifyAttribute('email', verificationCode, {
          onSuccess: (result) => {
            localStorage.setItem('userEmail', newEmail);
            onClose(newEmail);
          },
          onFailure: (err) => {
            setError(err.message || JSON.stringify(err));
          },
        });
      });
    } else {
      setError("User is not authenticated");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Email bearbeiten</h2>
        {!showVerification ? (
          <>
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
            {error && <p className="error">{error}</p>}
            <div className="modal-buttons">
              <button onClick={() => onClose(null)}>Schliessen</button>
              <button onClick={handleSave}>Speichern</button>
            </div>
          </>
        ) : (
          <>
            <p>Ein Bestätigungscode wurde an {newEmail} gesendet.</p>
            <input
              type="text"
              placeholder="Bestätigungscode eingeben"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
            {error && <p className="error">{error}</p>}
            <div className="modal-buttons">
              <button onClick={() => onClose(null)}>Schliessen</button>
              <button onClick={handleVerify}>Verifizieren</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EditEmailModal;