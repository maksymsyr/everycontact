import { Card, Form, Alert, Button } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { resetPasswordWithOtp } from "../lib/authenticate";

export default function ResetPassword() {
  const [userEmail, setUserEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [warning, setWarning] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setWarning(""); setSuccess("");

    try {
      const msg = await resetPasswordWithOtp(userEmail, otp, newPassword);
      setSuccess(msg + " Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setWarning(err.message);
    }
  }

  return (
    <div className="login-container fade-in-slide" style={{ marginTop: "80px" }}>
      <Card bg="light" className="login-card shadow-sm">
        <Card.Body>
          <h2 className="mb-3">Reset Password</h2>
          Enter your email, OTP, and new password
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
        <Form.Group>
          <Form.Label>OTP:</Form.Label>
          <Form.Control
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </Form.Group>

        <br />
        <Form.Group>
          <Form.Label>New Password:</Form.Label>
          <Form.Control
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </Form.Group>

        <br />
        <Button type="submit" variant="success">Reset Password</Button>
      </Form>

      {warning && <Alert variant="danger" className="mt-3">{warning}</Alert>}
      {success && <Alert variant="success" className="mt-3">{success}</Alert>}
    </div>
  );
}
