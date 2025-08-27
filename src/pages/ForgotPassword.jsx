import { Card, Form, Alert, Button } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { requestPasswordReset } from "../lib/authenticate";

export default function ForgotPassword() {
  const [userEmail, setUserEmail] = useState("");
  const [warning, setWarning] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setWarning(""); 
    setSuccess("");

    try {
      const msg = await requestPasswordReset(userEmail);
      setSuccess(msg);

      // Redirect to /reset-password after 2 seconds
      setTimeout(() => {
        navigate("/reset-password");
      }, 2000);
    } catch (err) {
      setWarning(err.message);
    }
  }

  return (
    <div className="login-container fade-in-slide" style={{ marginTop: "80px" }}>
      <Card bg="light" className="login-card shadow-sm">
        <Card.Body>
          <h2 className="mb-3">Forgot Password</h2>
          Enter your email to receive an OTP
        </Card.Body>
      </Card>

      <br />

      <Form onSubmit={handleSubmit} className="login-form fade-in-slide delay-1">
        <Form.Group>
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            required
          />
        </Form.Group>

        <br />
        <Button type="submit" variant="primary">Send OTP</Button>
      </Form>

      {warning && <Alert variant="danger" className="mt-3">{warning}</Alert>}
      {success && <Alert variant="success" className="mt-3">{success}</Alert>}
    </div>
  );
}
