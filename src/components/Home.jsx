import { Button, Row, Col, Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home({ token }) {
  const isLoggedIn = Boolean(token);

  return (
    <div className="home-background">
      <Container className="text-center py-5 home-container">
        <Image
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapers.com%2Fimages%2Fhd%2Fglowing-contact-us-logo-qx58564q7a51etk6.jpg&f=1&nofb=1&ipt=fad5f5b6662b2cdac18329b891eca79c19f643245b96b9b32d35d3fd9c2ca61c"
          alt="Contacts Illustration"
          fluid
          rounded
          className="mb-4 mx-auto d-block shadow-lg fade-in"
          style={{ maxWidth: "500px" }}
        />

        <h1 className="display-4 mb-3 fade-in delay-1">Welcome to EveryContact</h1>
        <p className="lead mb-4 fade-in delay-2">
          Securely manage all your contacts in one place. 
          <strong> Add</strong>, <strong>Edit</strong>, and <strong>View</strong> your contacts effortlessly.
        </p>

        <Row className="justify-content-center mb-5 fade-in delay-3">
          <Col xs="auto">
            <Button
              as={Link}
              to={isLoggedIn ? "/contacts/add" : "#"}
              variant="primary"
              size="lg"
              className="btn-animated"
              disabled={!isLoggedIn}
            >
              Add Contact
            </Button>
          </Col>
          <Col xs="auto">
            <Button
              as={Link}
              to={isLoggedIn ? "/contacts" : "#"}
              variant="outline-primary"
              size="lg"
              className="btn-animated"
              disabled={!isLoggedIn}
            >
              View Contacts
            </Button>
          </Col>
        </Row>

        {!isLoggedIn && (
          <div className="text-danger fade-in delay-3">
            ! Please log in to manage your contacts.
          </div>
        )}

        <Row className="justify-content-center fade-in delay-4">
          <Col lg={8}>
            <p className="text-light">
              EveryContact keeps your data private and secure. Start organizing your contacts today and never lose track of anyone again.
            </p>
          </Col>
        </Row>
      </Container>

      {/* Floating particles */}
      <div className="particles">
        {[...Array(30)].map((_, i) => (
          <div key={i} className="particle" />
        ))}
      </div>
    </div>
  );
}
