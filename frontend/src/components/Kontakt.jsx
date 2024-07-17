import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import './Kontakt.css';

const Kontakt = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_vo1647c', 'template_kt48a2k', form.current, {
        publicKey: 'kxnKAqBqfqr5mxlU8',
      })
      .then(
        (result) => {
          console.log(result.text);
          console.log('Message sent!');
          form.current.reset(); // Reset the form fields
        },
        (error) => {
          console.log('FAILED...', error.text);
        }
      );
  };

  return (
    <div className="kontakt-container">
      <div className="section-one">
        <h1>Reach [Site Name] all over the globe</h1>
        <p>Fill out this quick contact form and we will get in touch with you immediately.</p>
      </div>
      <div className="form-section">
        <form ref={form} onSubmit={sendEmail}>
          <label>Name</label>
          <input type="text" name="from_name" required />

          <label>Email</label>
          <input type="email" name="user_email" required />

          <label>Message</label>
          <textarea name="message" required></textarea>

          <input type="submit" value="Send" className="custom-button" />
        </form>
        <div className="info-section">
          <p>If you have a question about how the <span className="highlight">WatchUs!</span> platform works and are interested in speaking with a member of our sales team, simply fill out this form and we will contact you.</p>
          <p>If you need technical support, please fill out this form and we will get back to you as soon as possible.</p>
        </div>
      </div>
    </div>
  );
};

export default Kontakt;