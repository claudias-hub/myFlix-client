import React, { useState } from "react";
import { Form, Button, Alert, Container, Row, Col } from "react-bootstrap";

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("https://movie-api-w67x.onrender.com/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
        email: email,
      }),
    })
      .then((res) => {
        if (res.ok) {
          setMessage("Signup successful! You can now log in.");
          // Clear inputs (optional)
          setUsername("");
          setPassword("");
          setEmail("");
        } else {
          return res.json().then((data) => {
            throw new Error(data.message || "Signup failed.");
          });
        }
      })
      .catch((err) => {
        setMessage(err.message || "Signup failed.");
      });
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={6}>
          <h2 className="text-center mb-4">Sign Up</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="signupUsername" className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required
                minLength={3}
              />
            </Form.Group>

            <Form.Group controlId="signupPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                minLength={6}
              />
            </Form.Group>

            <Form.Group controlId="signupEmail" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                required
              />
            </Form.Group>

            {message && (
              <Alert
                variant={message.includes("successful") ? "success" : "danger"}
              >
                {message}
              </Alert>
            )}

            <Button variant="success" type="submit" className="w-100">
              Sign Up
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
