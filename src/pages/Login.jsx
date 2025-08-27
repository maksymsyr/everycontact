import { Card, Form, Alert, Button } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authenticateUser, readToken } from "../lib/authenticate";
import "./Login.css"; // add this CSS file

export default function Login({ setToken }) {
  const [warning, setWarning] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await authenticateUser(userEmail, password);

      const savedToken = readToken();
      setToken(savedToken);

      navigate("/contacts");
    } catch (err) {
      setWarning(err.message);
    }
  }

  return (
    <div className="login-container fade-in-slide">
      <Card bg="light" className="login-card shadow-sm">
        <Card.Body>
          <h2 className="mb-3">Login</h2>
          Enter your credentials to access the app:
        </Card.Body>
      </Card>

      <br />

      <Form onSubmit={handleSubmit} className="login-form fade-in-slide delay-1">
        <Form.Group>
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            value={userEmail}
            id="userEmail"
            name="userEmail"
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
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
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
      <div className="d-flex justify-content-between align-items-center mt-2">
        <Button
          variant="link"
          className="p-0"
          onClick={() => navigate("/forgot-password")}
        >
          Forgot Password?
        </Button>

        <Button
          variant="primary"
          size="lg"
          type="submit"
        >
          Login
        </Button>
      </div>

    </Form>
      
    </div>
  );
}
