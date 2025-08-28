  import { useState, useEffect } from "react";
  import { Navbar, Nav, NavDropdown, Container, Button } from "react-bootstrap";
  import { Link, useNavigate } from "react-router-dom";
  import "./MainNav.css";

export default function MainNav({ token, onLogout }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  function logout() {
    setIsExpanded(false);
    onLogout(); // clears token in App
    navigate("/login");
  }

    return (  
      <>
      <Navbar
        expand="lg"
        bg="dark"
        variant="dark"
        className="fixed-top"
        expanded={isExpanded}
      >
        <Container>
          <Navbar.Brand as={Link} to="/">
            EveryContact
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="main-navbar-nav"
            onClick={() => setIsExpanded(!isExpanded)}
          />
          <Navbar.Collapse id="main-navbar-nav">
            <Nav className="me-auto">
              {token && (
                <NavDropdown title="Contacts" id="contacts-dropdown">
                  <NavDropdown.Item
                    as={Link}
                    to="/contacts/add"
                    onClick={() => setIsExpanded(false)}
                  >
                    Add
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to="/contacts"
                    onClick={() => setIsExpanded(false)}
                  >
                    View
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>

            <Nav className="ms-auto align-items-center">
              {!token ? (
                <>
                  <Button
                    variant="success"
                    as={Link}
                    to="/login"
                    className="me-2 mb-2 mb-lg-0"
                    onClick={() => setIsExpanded(false)}
                  >
                    Login
                  </Button>
                  <Button
                    variant="light"
                    as={Link}
                    to="/register"
                    className="mb-2 mb-lg-0"
                    onClick={() => setIsExpanded(false)}
                  >
                    Register
                  </Button>
                </>
              ) : (
                <>
                  <span className="text-light me-4">Hello, {token.userName}</span>
                  <Button variant="outline-light" onClick={logout}>
                    Logout
                  </Button>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>


        <div style={{ height: "90px" }}></div>
      </>
    );
  }
