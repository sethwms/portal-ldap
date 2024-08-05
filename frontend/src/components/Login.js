import { useState } from "react";
import axios from "axios";
import { Form, Button, Alert, Container, Row, Col } from "react-bootstrap";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/portal/api/login/", {
        username,
        password,
      });
      setMessage("Logged in successfully");
      localStorage.setItem("authToken", response.data.token);
      setIsAuthenticated(true);
    } catch (error) {
      setMessage("Login failed: " + (error.response?.data?.error || "Unknown error, contact an administrator for assistance"));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setMessage("Logged out successfully");
    setIsAuthenticated(false);
  };

  return (
    <Container>
      <Row className="mt-4 justify-content-md-center">
        <Col md={4}>
          {!isAuthenticated ? (
            <div>
              <h2 className="text-center">Login</h2>
              {message ? <Alert variant="info">{message}</Alert> : <Alert variant="warning">Awaiting communication from server</Alert>}
              <Form onSubmit={handleLogin}>
                <Form.Group controlId="formUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formPassword" className="mt-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-4" block>
                  Login
                </Button>
              </Form>
            </div>
          ) : (
            <div>
              <h2 className="text-center">Logged In!</h2>
              {message ? <Alert variant="info">{message}</Alert> : <Alert variant="warning">Awaiting communication from server</Alert>}
              <Button variant="secondary" onClick={handleLogout} block>
                Logout
              </Button>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
