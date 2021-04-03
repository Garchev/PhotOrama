import { Component } from 'react';
import './Auth.css';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import * as userServices from '../../services/user';
class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedIn: false,
            user: null,
            email: '',
            password: ''
        }
    }

    changeProp = (event) => {

        this.setState({ [event.target.name]: event.target.value })
    }
    handleSubmit = async (event) => {

        event.preventDefault();
        const {
            email,
            password
        } = this.state;

        try {
            userServices.login(email, password).then((userCredential) => {
                this.setState({user: userCredential.user, loggedIn: true})
                userServices.getUserFromDB(email)
                this.props.history.push('/')
            })
                .catch(e => {
                    throw new Error(e);
                })
        } catch (e) {
            let errorBar = document.getElementById('error');
            errorBar.innerText = e;
            errorBar.style.display = "block";

            setTimeout(() => {
                errorBar.style.display = "none";

            }, 2000);
        }
    }

    render() {
        return (
            <Container fluid="sm" id="authContainer">
                <Alert id="error" variant="danger">Error</Alert>

                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formGroupEmail">
                        <Form.Label>Enter Email address</Form.Label>
                        <Form.Control
                            value={this.email}
                            onChange={this.changeProp}
                            name="email"
                            type="email"
                            placeholder="Enter email address" />
                    </Form.Group>
                    <Form.Group controlId="formGroupPassword">
                        <Form.Label>Enter Password</Form.Label>
                        <Form.Control
                            value={this.password}
                            onChange={this.changeProp}
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
}

export default Login;