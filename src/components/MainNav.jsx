import { useState, useEffect } from "react";
import { Navbar, Nav, NavDropdown, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { readToken } from "../lib/authenticate";

export default function MainNav({ onLogout }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [token, setToken] = useState(readToken()); // read from localStorage initially
  const navigate = useNavigate();

  // Update token if localStorage changes (covers back button & multi-tab)
  useEffect(() => {
    const handleStorage = () => setToken(readToken());
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  function logout() {
    setIsExpanded(false);
    onLogout(); // clears localStorage
    setToken(null); // update local state immediately
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
          <Navbar.Toggle onClick={() => setIsExpanded(!isExpanded)} />
          <Navbar.Collapse>
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
                    variant="outline-light"
                    as={Link}
                    to="/login"
                    className="me-2"
                    size="lg"
                    onClick={() => setIsExpanded(false)}
                  >
                    Login
                  </Button>
                  <Button
                    variant="light"
                    as={Link}
                    to="/register"
                    size="lg"
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
