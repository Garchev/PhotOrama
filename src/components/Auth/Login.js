import { useContext } from 'react';
import './Auth.css';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import * as userServices from '../../services/user';
import { UserContext } from '../../UserContext';

function Login({ history }) {
    const { setUser } = useContext(UserContext);

    const handleSubmit = async (event) => {
        event.preventDefault();
        let email = event.target.email.value;
        let password = event.target.password.value;
        try {
            await userServices.login(email, password);
            await userServices.getUserFromDB(email).then((user) => {
                setUser({
                    loggedIn: true,
                    user: {
                        username: user.username,
                        email: user.email,
                        id: user.id
                    }
                })
            })
            history.push('/')

        } catch (e) {
            let errorBar = document.getElementById('error');
            errorBar.innerText = e;
            errorBar.style.display = "block";

            setTimeout(() => {
                errorBar.style.display = "none";

            }, 2000);
        }
    }


    return (
        <Container fluid="sm" id="authContainer">
            <Alert id="error" variant="danger">Error</Alert>

            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formGroupEmail">
                    <Form.Label>Enter Email address</Form.Label>
                    <Form.Control
                        name="email"
                        type="email"
                        placeholder="Enter email address" />
                </Form.Group>
                <Form.Group controlId="formGroupPassword">
                    <Form.Label>Enter Password</Form.Label>
                    <Form.Control
                        name="password"
                        type="password"
                        placeholder="Enter Password" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
        </Container>
    )
}


export default Login;