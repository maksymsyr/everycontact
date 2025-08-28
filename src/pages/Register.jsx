import { Card, Form, Alert, Button } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setToken, registerUser } from "../lib/authenticate";
import "./Register.css";


export default function Register() {
  const [warning, setWarning] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await registerUser(userName, userEmail, password, password2);
      navigate("/login");
    } catch (err) {
      setWarning(err.message);
    }
  }

  return (
    <div className="register-container fade-in-slide">
      <Card bg="light" className="register-card shadow-sm">
        <Card.Body>
          <h2 className="mb-3">Register</h2>
          Enter your registration information below:
        </Card.Body>
      </Card>

      <br />

      <Form onSubmit={handleSubmit} className="register-form fade-in-slide delay-1">
        <Form.Group>
          <Form.Label>User Name:</Form.Label>
          <Form.Control
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </Form.Group>

        <br />

        <Form.Group>
          <Form.Label>User Email:</Form.Label>
          <Form.Control
            type="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            required
          />
        </Form.Group>

        <br />

        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <br />

        <Form.Group>
          <Form.Label>Confirm Password:</Form.Label>
          <Form.Control
            type="password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            required
          />
        </Form.Group>

        {warning && (
          <>
            <br />
            <Alert variant="danger" className="fade-in-slide delay-2">{warning}</Alert>
          </>
        )}

        <br />
        <Button variant="primary" type="submit" className="btn-animated delay-3">
          Register
        </Button>
      </Form>
    </div>
  );
}
