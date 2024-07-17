import React, { useState, useEffect } from 'react';
import 'react-calendar/dist/Calendar.css';
import "./Conference.css";
import { Modal, Button } from 'react-bootstrap';
import JitsiMeetComponent from './JitsiMeetComponent';
import { Link } from "react-router-dom";
import { Axios } from 'axios';
import SearchBar from './SearchBar';
import ConferenceCalendar from './ConferenceCalendar'; // Importiere die neue ConferenceCalendar Komponente
import Sidebar from './Sidebar'; // Importiere die neue Sidebar Komponente
import CreateConferenceModal from './CreateConferenceModal';

const Conference = ({ user }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    if (user) {
      setUserEmail(storedEmail);
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/conferences`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData = await response.json();

      const modifiedData = jsonData.map(item => ({
        ...item,
        startdate: new Date(item.startdate),
        enddate: new Date(item.enddate),
      }));

      setData(modifiedData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const handleEventClick = event => {
    setShowModal(true);
    setSelectedEvent(event);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
  };

  const openCreateForm = () => {
    setShowCreateForm(true);
  };

  const closeCreateForm = () => {
    setShowCreateForm(false);
  };

  const handleCreateConference = async (newConference) => {
    try {
      const response = await fetch('http://localhost:3001/api/conferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newConference),
      });
      await fetchData(); // Refresh conference data

      setShowCreateForm(false); // Close the form

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error creating conference:', error);
      // Add additional error handling as needed
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bigconf">
      <Sidebar
        search={search}
        setSearch={setSearch}
        data={data}
        userEmail={userEmail}
        openCreateForm={openCreateForm}
      />
      <div className="kalenderpug">
        <hr />
        <ConferenceCalendar
          data={data}
          userEmail={userEmail}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          handleEventClick={handleEventClick}
        />
      </div>

      {/* Create Conference Modal */}
      <CreateConferenceModal
        show={showCreateForm}
        onClose={closeCreateForm}
        onSave={handleCreateConference}
      />

      {/* Event Modal */}
      <Modal className="modalcontent123" show={showModal} onHide={closeModal}>
          <Modal.Title>Event Details</Modal.Title>
        <Modal.Body className="modalcontent456">
          {selectedEvent && (
            <>
              <p><strong>Name:</strong> {selectedEvent.name}</p>
              <p><strong>Start:</strong> {selectedEvent.startdate.toLocaleDateString()}</p>
              <p><strong>End:</strong> {selectedEvent.enddate.toLocaleDateString()}</p>
              <p><strong>Start:</strong> {selectedEvent.starttime}</p>
              <p><strong>End:</strong> {selectedEvent.endtime}</p>
              <p><strong>Description:</strong> {selectedEvent.description}</p>
              <p><strong>Link:</strong> <a href={selectedEvent.link} target="_blank" rel="noopener noreferrer">{selectedEvent.link}</a></p>
              <p><strong>Location:</strong> {selectedEvent.location}</p>
              <p><strong>Participant Email:</strong> {selectedEvent.participant_email}</p>
            </>
          )}
        </Modal.Body>
          <Button className="savebutton" onClick={closeModal}>
            Close
          </Button>
      </Modal>
    </div>
  );
};

export default Conference;
