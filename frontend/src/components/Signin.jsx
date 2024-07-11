import React, { useState } from "react";
import { CognitoUser, AuthenticationDetails, CognitoUserPool } from "amazon-cognito-identity-js";
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';
import "./Signin.css";

const poolData = {
  UserPoolId: "eu-central-1_9qZhZhfNw",
  ClientId: "1nqan7a5peja3fv8n9ofp5u7pm",
};

const userPool = new CognitoUserPool(poolData);

const Signin = ({ setUser, modalIsOpen, closeModal }) => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Name, setName] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async () => {
    const authenticationData = {
      Username: Email,
      Password: Password,
    };

    const authenticationDetails = new AuthenticationDetails(authenticationData);

    const userData = {
      Username: Email,
      Pool: userPool,
    };

    const cognitoUser = new CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        console.log("Authentication success:", result);

        // Fetch user attributes after successful authentication
        cognitoUser.getUserAttributes((err, attributes) => {
          if (err) {
            console.error("Error fetching user attributes:", err);
            return;
          }

          // Extract and set user name from attributes
          const userAttributes = {};
          for (let attribute of attributes) {
            userAttributes[attribute.getName()] = attribute.getValue();
          }

          // Set user name in state or pass to parent component
          setUser(Name);

          // Save email in local storage
          localStorage.setItem("userEmail", Email);

          alert("Login successful!");
          alert(Email)
          navigate('/'); // Redirect to home page after successful login
          closeModal(); // Close the modal
        });
      },
      onFailure: (err) => {
        console.error("Authentication failure:", err);
        alert(err.message || JSON.stringify(err));
      },
    });
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Sign In Modal"
      className="signin-modal"
      overlayClassName="signin-modal-overlay"
    >
      <h1 className="h1-design">Sign In to Your Account</h1>
      <div className="form-container">
        <div className="input-container">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={Name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleSignIn}>
          Sign In
        </button>
      </div>
    </Modal>
  );
};

export default Signin;
