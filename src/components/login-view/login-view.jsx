import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, Button, Alert, Container, Row, Col } from "react-bootstrap";
//import './login-view.scss';

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username.length < 3) {
      setMessage("Username must be at least 3 characters long.");
      return;
    }

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);
    setMessage("");


    fetch("https://movie-api-w67x.onrender.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Invalid username or password");
        }
        return response.json();
      })
      .then((data) => {
        if (data.user && data.token) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token);
        } else {
          throw new Error("Invalid server response");
        }
      })
      .catch((err) => {
        setMessage(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={6}>
          <h2 className="text-center mb-4">Login</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="loginUsername" className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setMessage("");
                }}
                placeholder="Enter username"
                required
              />
            </Form.Group>

            <Form.Group controlId="loginPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setMessage("");
                }}
                placeholder="Enter password"
                required
              />
            </Form.Group>

            {message && <Alert variant="danger">{message}</Alert>}

            <Button variant="primary" type="submit" className="w-100"  disabled={loading} >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
};
