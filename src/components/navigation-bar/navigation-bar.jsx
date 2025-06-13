import React, { useState } from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

export const NavigationBar = ({ user, onLoggedOut }) => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const handleLogout = () => {
    onLoggedOut(); // this should clear token and user info
    navigate('/login');
    setExpanded(false);
  };

  const handleNavClick = () => {
    setExpanded(false); // Cierra el menu cuando haces clic en un link
  };

  return (
    <Navbar 
      bg="primary" 
      variant="dark" 
      expand="lg" 
      fixed="top"
      expanded={expanded}
      onToggle={(expanded) => setExpanded(expanded)}
      className="shadow-sm"
    >
      <Container fluid>
        <Navbar.Brand 
          as={Link} 
          to="/" 
          onClick={handleNavClick}
          className="fw-bold fs-3"
        >
          🎬 myFlix
        </Navbar.Brand>
        
        <Navbar.Toggle 
          aria-controls="navbar-nav"
          onClick={() => setExpanded(!expanded)}
        />
        
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto align-items-center">
            {user ? (
              <>
                <Nav.Link 
                  as={Link} 
                  to="/" 
                  onClick={handleNavClick}
                  className="px-3 py-2"
                >
                  Movies!
                </Nav.Link>
                <Nav.Link 
                  as={Link} 
                  to="/profile" 
                  onClick={handleNavClick}
                  className="px-3 py-2"
                >
                  👤 Profile
                </Nav.Link>
                <Button 
                  variant="outline-light" 
                  onClick={handleLogout}
                  className="ms-2 mt-2 mt-lg-0"
                  size="sm"
                >
                  🚪 Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link 
                  as={Link} 
                  to="/login" 
                  onClick={handleNavClick}
                  className="px-3 py-2"
                >
                  🔑 Login
                </Nav.Link>
                <Nav.Link 
                  as={Link} 
                  to="/signup" 
                  onClick={handleNavClick}
                  className="px-3 py-2"
                >
                  📝 Signup
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
