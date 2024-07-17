import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';
import Signin from './Signin';
import Register from './Register'; // Importieren Sie die Register-Komponente hier
import Nachrichten from './Nachrichten'; // Importieren Sie die Nachrichten-Komponente hier
import Benutzerkonto from './Benutzerkonto'; // Importieren Sie die Benutzerkonto-Komponente hier

Modal.setAppElement('#root'); // Set the root element for accessibility

function MyNavbar({ user, setUser }) {
    const [showSubMenu, setShowSubMenu] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [isRegisterModal, setIsRegisterModal] = useState(false); // State to toggle between Signin and Register
    const [nachrichtenModalIsOpen, setNachrichtenModalIsOpen] = useState(false); // State to control Nachrichten modal
    const [benutzerkontoModalIsOpen, setBenutzerkontoModalIsOpen] = useState(false); // State to control Benutzerkonto modal
    const timeoutRef = useRef(null);
    const navigate = useNavigate();

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

    document.querySelectorAll('.nav-link').forEach(item => {
        item.addEventListener('click', event => {
          // Entfernen Sie die aktive Klasse von allen Elementen
          document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
          // Fügen Sie die aktive Klasse zum geklickten Element hinzu
          event.currentTarget.classList.add('active');
        });
    });
      

    useEffect(() => {
        const handleClick = (event) => {
            const anchor = event.target;
            if (anchor.hash !== "") {
                event.preventDefault();
                const hash = anchor.hash;
                document.querySelector(hash).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        };


    }, []);

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('userEmail');
        navigate('/'); // Zurück zur Startseite navigieren
        window.location.reload(); // Seite aktualisieren, um den Benutzerzustand zu löschen
    };

    const closeAllModals = () => {
        setModalIsOpen(false);
        setNachrichtenModalIsOpen(false);
        setBenutzerkontoModalIsOpen(false);
    };

    const openModal = (isRegister) => {
        closeAllModals();
        setIsRegisterModal(isRegister);
        setModalIsOpen(true);
    };

    const openNachrichtenModal = () => {
        closeAllModals();
        setNachrichtenModalIsOpen(true);
    };

    const openBenutzerkontoModal = () => {
        closeAllModals();
        setBenutzerkontoModalIsOpen(true);
    };

    return (
        <>
            <Navbar fixed="top" className="navbar-transparent" expand="lg">
                <Navbar.Brand as={Link} to="/" className="navbar-brand-custom">
                    Watch Us {/* Modify this text to change the brand name */}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/" className="page-scroll">Home</Nav.Link>
                        {!user && (
                            <Nav.Link as={Link} to="/pricing" className="page-scroll">Pricing</Nav.Link>
                        )}
                        {user && (
                        <>
                            <Nav.Link as={Link} to="/conference" className="page-scroll">Conference</Nav.Link>
                            <Nav.Link as={Link} to="/pricing1" className="page-scroll">Pricing</Nav.Link>
                        </>
                        )}
                        <Nav.Link as={Link} to="/about" className="page-scroll">About</Nav.Link>
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
                                    <NavDropdown.Item onClick={openBenutzerkontoModal} className="page-scroll">Profile</NavDropdown.Item>
                                    <NavDropdown.Item onClick={openNachrichtenModal} className="page-scroll">Notifications</NavDropdown.Item>
                                </NavDropdown>
                                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link onClick={() => openModal(false)} className="page-scroll">Login</Nav.Link>
                                <Nav.Link onClick={() => openModal(true)} className="page-scroll">Register</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeAllModals}
                contentLabel="Auth Modal"
                className="modal"
                overlayClassName="overlay"
            >
                {isRegisterModal ? (
                    <Register setUser={setUser} onRequestClose={closeAllModals} />
                ) : (
                    <Signin setUser={setUser} onRequestClose={closeAllModals} />
                )}
            </Modal>

            <Modal
                isOpen={nachrichtenModalIsOpen}
                onRequestClose={closeAllModals}
                contentLabel="Nachrichten Modal"
                className="modal"
                overlayClassName="overlay"
            >
                <Nachrichten />
            </Modal>

            <Modal
                isOpen={benutzerkontoModalIsOpen}
                onRequestClose={closeAllModals}
                contentLabel="Benutzerkonto Modal"
                className="modal"
                overlayClassName="overlay"
            >
                <Benutzerkonto />
            </Modal>
        </>
    );
}

export default MyNavbar;
