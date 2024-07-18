import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './CreateConferenceModal.css';

const CreateConferenceModal = ({ show, onClose, onSave }) => {
  const [newConference, setNewConference] = useState({
    organisator: "",
    name: '',
    description: '',
    startdate: '',
    enddate: '',
    starttime: '',
    endtime: '',
    location: '',
    link: '',
    participant_emails: [],
  });

  const handleInputChange = e => {
    const { name, value } = e.target;

    if (name === 'participant_emails') {
      const emailsArray = value.split(',').map(email => email.trim());
      setNewConference(prevConference => ({
        ...prevConference,
        [name]: emailsArray,
      }));
    } else {
      setNewConference(prevConference => ({
        ...prevConference,
        [name]: value,
      }));
    }
  };

  const generateJitsiLink = () => {
    const roomName = `Conference_${Date.now()}`;
    const domain = "meet.ffmuc.net";
    const link = `https://${domain}/${roomName}`;
    setNewConference(prevConference => ({
      ...prevConference,
      link,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSave(newConference);
  };

  return (
    <Modal className="custom-modal" show={show} onHide={onClose} backdrop="static">
      <div className="modal-content">
        <h5 className="speziha">Create Conference</h5>
        <form className="form2" onSubmit={handleSubmit}>
          <div className="form-group1">
            Organisator:
            <input type="text" name="organisator" value={newConference.organisator} onChange={handleInputChange} required />
          </div>
          <div className="form-group1">
            Conference-Name:
            <input type="text" name="name" value={newConference.name} onChange={handleInputChange} required />
          </div>
          <div className="form-group1">
            Description:
            <textarea name="description" value={newConference.description} onChange={handleInputChange} required />
          </div>
          <div className="form-group1">
            Start Date:
            <input type="date" name="startdate" value={newConference.startdate} onChange={handleInputChange} required />
          </div>
          <div className="form-group1">
            End Date:
            <input type="date" name="enddate" value={newConference.enddate} onChange={handleInputChange} required />
          </div>
          <div className="form-group1">
            Start Time:
            <input type="time" name="starttime" value={newConference.starttime} onChange={handleInputChange} required />
          </div>
          <div className="form-group1">
            End Time:
            <input type="time" name="endtime" value={newConference.endtime} onChange={handleInputChange} required />
          </div>
          <div className="form-group1">
            Location:
            <input type="text" name="location" value={newConference.location} onChange={handleInputChange} required />
          </div>
          <div className="form-group1">
            Link:
            <input type="url" name="link" value={newConference.link} onChange={handleInputChange} required />
            <button className="savebutton" onClick={generateJitsiLink}>Generate Link</button>
          </div>
          <div className="form-group1">
            Participants (comma-separated):
            <input type="text" name="participant_emails" value={newConference.participant_emails.join(', ')} onChange={handleInputChange} required />
          </div>
          <button className="closebutton1" onClick={onClose}>Close</button>
          <button className="savebutton1" type="submit" onClick={() => alert('Conference successfully created')}>Create</button>
        </form>
      </div>
    </Modal>
  );
};

export default CreateConferenceModal;
