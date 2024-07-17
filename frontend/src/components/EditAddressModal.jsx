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
      const response = await fetch(`http://localhost:3001/api/benutzer?email=${email}`);
      const userData = await response.json();
      setFirstName(userData.vorname);
      setLastName(userData.nachname);
      setNewAddress(userData.adresse);
      setNewPhone(userData.telefonnummer);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const Speichern = async () => {
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
      onClose(userData);
    }
  };
  

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit personal data</h2>
        <label>Email:</label>
        <input className="inputtest" type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled />
        <label>First Name:</label>
        <input className="inputtest" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <label>Last Name:</label>
        <input className="inputtest" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        <label>Address:</label>
        <input className="inputtest" type="text" value={newAddress} onChange={(e) => setNewAddress(e.target.value)} />
        <label>Phone Number:</label>
        <input className="inputtest" type="text" value={newPhone} onChange={(e) => setNewPhone(e.target.value)} />
        <div className="button-container">
          <button className="closebutton" onClick={() => onClose(null)}>Close</button>
          <button className="savebutton" onClick={Speichern}>Save</button>
        </div>
      </div>
    </div>
  );
  
};

export default EditAddressModal;
