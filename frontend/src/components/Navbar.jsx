import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';
import { useNavigate } from "react-router-dom";
import { CognitoUserPool, CognitoUser } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: "eu-central-1_u1EUpgENY",
  ClientId: "34b76ra579e5682vh0mjju3pud",
};

const userPool = new CognitoUserPool(poolData);

function MyNavbar({ user, setUser }) {
    const [showSubMenu, setShowSubMenu] = useState(false);
    const [userName, setUserName] = useState('');
    const timeoutRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const email = localStorage.getItem('userEmail');
        console.log("Loaded email from local storage:", email);

        if (email) {
            const currentUser = userPool.getCurrentUser();
            
            if (currentUser) {
                currentUser.getSession((err, session) => {
                    if (err || !session.isValid()) {
                        console.log("Session is invalid:", err);
                        setUser(null);
                    } else {
                        currentUser.getUserAttributes((err, attributes) => {
                            if (err) {
                                console.log("Error getting user attributes:", err);
                                return;
                            }
                            console.log("User attributes:", attributes);
                            attributes.forEach(attribute => {
                                if (attribute.getName() === 'name' || attribute.getName() === 'email') {
                                    setUserName(attribute.getValue());
                                    console.log("User name set to:", attribute.getValue());
                                }
                            });
                        });
                    }
                });
            }
        }
    }, []);

    const handleMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setShowSubMenu(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setShowSubMenu(false);
        }, 500);
    };

    const handleLogout = () => {
        const currentUser = userPool.getCurrentUser();
        if (currentUser) {
            currentUser.signOut();
        }
        setUser(null);
        localStorage.clear(); // Clear the local storage
        navigate('/'); // Navigate to the home page
    };

    return (
        <Navbar fixed="top" className="navbar-transparent" expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/" className="page-scroll">Home</Nav.Link>
                    <Nav.Link as={Link} to="/conference" className="page-scroll">Conference</Nav.Link>
                    {!user && (
                        <Nav.Link as={Link} to="/pricing" className="page-scroll">Pricing</Nav.Link>
                    )}
                    {user && (
                        <Nav.Link as={Link} to="/pricing1" className="page-scroll">Pricing</Nav.Link>
                    )}
                    <Nav.Link as={Link} to="/about" className="page-scroll">About us</Nav.Link>
                    <Nav.Link as={Link} to="/kontakt" className="page-scroll">Kontakt</Nav.Link>
                </Nav>
                <Nav>
                    {user ? (
                        <>
                            <NavDropdown
                                title={`Hello ${user}`}
                                id="basic-nav-dropdown"
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                show={showSubMenu}
                            >
                                <NavDropdown.Item as={Link} to="/benutzerkonto" className="page-scroll">Benutzerkonto</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/zahlungsverlauf" className="page-scroll">Zahlungsverlauf</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/nachrichten" className="page-scroll">Nachrichten</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/einstellungen" className="page-scroll">Einstellungen</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                        </>
                    ) : (
                        <>
                            <Nav.Link as={Link} to="/signin" className="page-scroll">Login</Nav.Link>
                            <Nav.Link as={Link} to="/register" className="page-scroll">Register</Nav.Link>
                        </>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default MyNavbar;
