import { useState, useEffect } from "react";
import { Card, Button, Row, Col, Alert, ButtonGroup } from "react-bootstrap";
import { getContacts, deleteContact } from "../lib/contactsService";
import { useNavigate } from "react-router-dom";

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchContacts();
  }, []);

  async function fetchContacts() {
    try {
      const data = await getContacts();
      setContacts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      try {
        await deleteContact(id);
        setContacts(contacts.filter((c) => c._id !== id));
      } catch (err) {
        setError("Failed to delete contact");
      }
    }
  }

  if (loading) return <p>Loading contacts...</p>;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <>
  <Button
    className="mb-4"
    onClick={() => navigate("/contacts/add")}
    style={{
      fontWeight: "bold",
      borderRadius: "0.5rem",
    }}
  >
    ➕ Add Contact
  </Button>




      <Row>
        {contacts.map((contact) => (
          <Col key={contact._id} sm={12} md={6} lg={4} className="mb-4">
            <Card className="shadow-sm rounded-4 border-0" style={{ backgroundColor: "#f8f9fa" }}>
              <Card.Body>
                <Card.Title className="text-primary fw-bold">{contact.name}</Card.Title>
                <Card.Text className="text-muted mb-3">
                  <strong>Email:</strong> {contact.email} <br />
                  <strong>Phone:</strong> {contact.phone} <br />
                  {contact.notes && (
                    <>
                      <strong>Notes:</strong> {contact.notes}
                    </>
                  )}
                </Card.Text>

              <div className="d-flex justify-content-end">
                <Button
                  variant="success"
                  size="sm"
                  className="me-2"
                  onClick={() => navigate(`/contacts/edit/${contact._id}`)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(contact._id)}
                >
                  Delete
                </Button>
              </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}
