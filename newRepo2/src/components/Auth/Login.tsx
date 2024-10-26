import { useContext } from "react";
import "./Auth.css";
import { Container, Form, Button, Alert } from "react-bootstrap";
import * as userServices from "../../services/user";
import { UserContext } from "../../UserContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    try {
      await userServices.login(email, password);
      await userServices.getUserFromDB(email).then((user) => {
        setUser({
          loggedIn: true,
          user: {
            username: user.username,
            email: user.email,
            id: user.id,
          },
        });
      });
      navigate("/");
    } catch (e) {
      const errorBar = document.getElementById("error");
      errorBar!.innerText = e!.toString();
      errorBar!.style.display = "block";

      setTimeout(() => {
        errorBar!.style.display = "none";
      }, 2000);
    }
  };

  return (
    <Container fluid="sm" id="authContainer">
      <Alert id="error" variant="danger">
        Error
      </Alert>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formGroupEmail" className='mb-3'>
          <Form.Label>Enter Email address</Form.Label>
          <Form.Control
            name="email"
            type="email"
            placeholder="Enter email address"
          />
        </Form.Group>
        <Form.Group controlId="formGroupPassword">
          <Form.Label>Enter Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Enter Password"
          />
        </Form.Group>
        <Button variant="primary" type="submit" className='mb-2'>
          Login
        </Button>
      </Form>
    </Container>
  );
}

export default Login;
