import React, { useState, useEffect } from 'react';
import './Benutzerkonto.css';
import Profil from './Profil.jsx';
import EditEmailModal from './EditEmailModal.jsx';
import EditAddressModal from './EditAddressModal.jsx';
import ChangePasswordModal from './ChangePasswordModal.jsx';
import { CognitoUserPool, CognitoUser } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: "eu-central-1_9qZhZhfNw",
  ClientId: "1nqan7a5peja3fv8n9ofp5u7pm",
};

const userPool = new CognitoUserPool(poolData);

const Benutzerkonto = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const currentUser = userPool.getCurrentUser();

    if (currentUser) {
      currentUser.getSession((err, session) => {
        if (err || !session.isValid()) {
          setIsLoggedIn(false);
        } else {
          setIsLoggedIn(true);
          currentUser.getUserAttributes((err, attributes) => {
            if (err) {
              console.log(err);
              return;
            }
            attributes.forEach(attribute => {
              switch (attribute.getName()) {
                case 'email':
                  setEmail(attribute.getValue());
                  break;
                case 'name':
                  setName(attribute.getValue());
                  break;
                case 'address':
                  setAddress(attribute.getValue());
                  break;
                case 'phone_number':
                  setPhone(attribute.getValue());
                  break;
                default:
                  break;
              }
            });
          });
        }
      });
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleEditEmailClick = () => {
    setIsEditingEmail(true);
  };

  const handleEditAddressClick = () => {
    setIsEditingAddress(true);
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

  const handleCloseAddressModal = (data) => {
    if (data !== null) {
      setName(`${data.firstName} ${data.lastName}`);
      setAddress(data.address);
      setPhone(data.phone);
    }
    setIsEditingAddress(false);
  };

  const handleClosePasswordModal = () => {
    setIsChangingPassword(false);
  };

  if (!isLoggedIn) {
    return <div>Bitte loggen Sie sich ein, um Ihre Kontoinformationen zu sehen.</div>;
  }

  return (
    <div className="benutzerkonto-container">
      <Profil />
      <div className="form-container">
        <h1>Benutzerkonto</h1>
        <div className="form-group">
          <label>E-Mail:</label>
          <p>{email}</p>
          <button onClick={handleEditEmailClick}>Bearbeiten</button>
        </div>
        <div className="form-group">
          <label>Adresse:</label>
          <button onClick={handleEditAddressClick}>Bearbeiten</button>
        </div>
        <div className="form-group">
          <label>Passwort:</label>
          <button onClick={handleChangePasswordClick}>Passwort ändern</button>
        </div>
      </div>
      {isEditingEmail && <EditEmailModal email={email} onClose={handleCloseEmailModal} />}
      {isEditingAddress && <EditAddressModal onClose={handleCloseAddressModal} />}
      {isChangingPassword && <ChangePasswordModal onClose={handleClosePasswordModal} />}
    </div>
  );
};

export default Benutzerkonto;
