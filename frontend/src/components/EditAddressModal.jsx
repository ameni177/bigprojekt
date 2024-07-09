import React, { useState } from 'react';
import './EditAddressModal.css';

const EditAddressModal = ({ address, phone, onClose }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [newAddress, setNewAddress] = useState(address);
  const [newPhone, setNewPhone] = useState(phone);

  const handleSave = () => {
    onClose({
      firstName,
      lastName,
      address: newAddress,
      phone: newPhone,
    });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Adresse bearbeiten</h2>
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
