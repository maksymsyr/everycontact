import { useState, useEffect } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { editContact, getContacts } from "../lib/contactsService";
import { useNavigate, useParams } from "react-router-dom";

export default function EditContact() {
  const { id } = useParams();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", notes: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function loadContact() {
      try {
        const contacts = await getContacts();
        const contact = contacts.find((c) => c._id === id);
        if (contact) setFormData(contact);
      } catch (err) {
        setError(err.message);
      }
    }
    loadContact();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await editContact(id, formData);
      navigate("/contacts");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <>
      <Card className="mb-3">
        <Card.Body>
          <h2>Edit Contact</h2>
        </Card.Body>
      </Card>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Notes (optional)</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          />
        </Form.Group>

        <Button type="submit">Save Changes</Button>
      </Form>
    </>
  );
}
