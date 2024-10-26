import { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import "./Auth.css";
import * as userServices from "../../services/user";
import { useNavigate } from "react-router-dom";
import { FORM_FIELDS, FORM_FIELDS_LABELS } from "../../constants/register";

interface IState {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
}

const Register = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<IState>({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  });

  const changeProp = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleError = (e) => {
    const errorBar = document.getElementById("error");
    errorBar!.innerText = e;
    errorBar!.style.display = "block";

    setTimeout(() => {
      errorBar!.style.display = "none";
    }, 2000);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      userServices.checkFieldsInForm(
        state.username,
        state.password,
        state.confirmPassword,
        state.email
      );

      userServices
        .register(state.email, state.password)
        .then((user) => {
          userServices.setUserInDB(user.user, state.username);
        })
        .then(() => {
          navigate("/users/login");
        })
        .catch((e) => {
          handleError(e);
        });
    } catch (e) {
      handleError(e);
    }
  };

  return (
    <Container id="authContainer" fluid="sm">
      <Alert id="error" variant="danger">
        Error
      </Alert>
      <Form onSubmit={handleSubmit}>
        {FORM_FIELDS.map((field: string) => {
          return (
            <Form.Group controlId="formGroupUsername" key={field}>
              <Form.Label>{FORM_FIELDS_LABELS[field]}</Form.Label>
              <Form.Control
                name={field}
                value={state[field as keyof IState]}
                onChange={changeProp}
                type="text"
                placeholder={FORM_FIELDS_LABELS[field]}
              />
            </Form.Group>
          );
        })}
        
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </Container>
  );
};

export default Register;
