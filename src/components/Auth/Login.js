import React, { Component } from 'react';
import './Auth.css';
import { Container, Form, Button } from 'react-bootstrap';
import * as user from '../../services/user';

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
    }

    changeEmail = (event) => {
        this.setState({ email: event.target.value })
    }

    changePassword = (event) => {
        this.setState({ password: event.target.value })
    }

    handleSubmit = (event) => {
        
        event.preventDefault();
        user.login(this.state.email, this.state.password).then(user => {
            this.props.history.push('/') 
        })
    }

    render = () => {
        return (
            <Container fluid="sm" >
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formGroupEmail">
                        <Form.Label>Enter Email address</Form.Label>
                        <Form.Control value={this.email} onChange={this.changeEmail} name="email" type="email" placeholder="Enter email address" />
                    </Form.Group>
                    <Form.Group controlId="formGroupPassword">
                        <Form.Label>Enter Password</Form.Label>
                        <Form.Control value={this.password} onChange={this.changePassword} name="password" type="password" placeholder="Enter Password" />
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