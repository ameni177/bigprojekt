import React, { useState, useEffect } from 'react';
import './EditAddressModal.css';

const EditAddressModal = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [newPhone, setNewPhone] = useState('');

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      setEmail(storedEmail);
      fetchUserData(storedEmail);
    }
  }, []);

  const fetchUserData = async (email) => {
    try {
      const response = await fetch(`http://localhost:3001/api/benutzer`);
      const data = await response.json();
      const userData = data.find(user => user.email === email);
      if (userData) {
        setEmail(userData.email);
        setFirstName(userData.vorname);
        setLastName(userData.nachname);
        setNewAddress(userData.adresse);
        setNewPhone(userData.telefonnummer);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleSave = async () => {
    const userData = {
      email: email,
      vorname: firstName,
      nachname: lastName,
      adresse: newAddress,
      telefonnummer: newPhone,
    };
  
    try {
      const response = await fetch('http://localhost:3001/api/benutzer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (response.ok) {
        alert('Daten erfolgreich gespeichert, jetzt verkaufen wir sie an Google.');
      } else {
        alert('Fehler beim abspeichern, bitte wende dich an den Support.');
      }
    } finally {
      onClose({
        firstName,
        lastName,
        address: newAddress,
        phone: newPhone,
      });
    }
  };
  
  

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Adresse bearbeiten</h2>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled />
        <label>Vorname:</label>
        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <label>Nachname:</label>
        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        <label>Adresse:</label>
        <input type="text" value={newAddress} onChange={(e) => setNewAddress(e.target.value)} />
        <label>Telefonnummer:</label>
        <input type="text" value={newPhone} onChange={(e) => setNewPhone(e.target.value)} />
        <button onClick={handleSave}>Speichern</button>
        <button onClick={() => onClose(null)}>Abbrechen</button>
      </div>
    </div>
  );
};

export default EditAddressModal;
