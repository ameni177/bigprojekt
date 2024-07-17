import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function EventModal({ show, onHide, event }) {
  if (!event) {
    return null;
  }

  return (
    <Modal show={show} onHide={onHide}>
        <Modal.Title>{event.title}</Modal.Title>
      <Modal.Body>
        <p>Start Time: {event.start.toLocaleString()}</p>
        <p>End Time: {event.end.toLocaleString()}</p>
        <p>Location: {event.location.toLocaleString()}</p>
        <p>
          Link: <a href={event.link} target="_blank" rel="noopener noreferrer">{event.link}</a>
        </p>
        {/* Add more details as needed */}
      </Modal.Body>
        <Button className="savebutton" onClick={onHide}>
          Close
        </Button>
    </Modal>
  );
}

export default EventModal;
