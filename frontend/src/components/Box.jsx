import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import Register from './Register'; // Assuming Register component is in the same directory

const Box = (props) => {
  const { title, btnClass, btnTitle, price, feature, btnId } = props;
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="card mb-4 shadow-sm box-size">
      <div className="card-header">
        <h4 className="my-0 font-weight-normal">{title}</h4>
      </div>
      <div className="card-body">
        <h1 className="card-title pricing-card-title">
          €{price} <small className="text-muted">/ mo</small>
        </h1>
        <ul className="list-unstyled mt-3 mb-4">
          {feature &&
            feature.map((data, index) => {
              return <li key={index}>{data}</li>;
            })}
        </ul>
        <div className="btn-container">
          {title === 'Free' ? (
            <button
              type="button"
              className={`btn btn-lg btn-block ${btnClass}`}
              onClick={openModal}
            >
              Sign-in for free
            </button>
          ) : (
            <button
              type="button"
              className={`btn btn-lg btn-block ${btnClass}`}
              onClick={openModal}
            >
              Sign-in for purchase
            </button>
          )}
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Register Modal"
      >
        <button onClick={closeModal}>Close</button>
        <Register />
      </Modal>
    </div>
  );
};

export default Box;
