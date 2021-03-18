import React, { Component } from 'react';
import './Auth.css';
import { Container, Form, Button } from 'react-bootstrap';
import * as userServices from '../../services/user';

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            rePassword: '',
            username: ''
        }
    }
    
    changeEmail = (event) => {
        this.setState({ email: event.target.value })
    }
    
    changePassword = (event) => {
        this.setState({ password: event.target.value })
    }
    
    changeRePassword = (event) => {
        this.setState({ rePassword: event.target.value })
    }
    
    changeUsername = (event) => {
        this.setState({ username: event.target.value })
    }
    
    handleSubmit = (event) => {
        event.preventDefault();
        userServices.register(this.state.email, this.state.password, this.state.rePassword, this.state.username).then(user => {
            this.props.history.push('/');
            userServices.register(user.localId, user.email, this.state.username);
        })
    }

    render = () => {

        return (
            <Container fluid="sm" >
                <Form onSubmit={this.handleSubmit} >
                <Form.Group controlId="formGroupUsername">
                        <Form.Label>Enter Username </Form.Label>
                        <Form.Control name="username" value={this.username} onChange={this.changeUsername} type="text" placeholder="Enter Username" />
                    </Form.Group>
                    <Form.Group controlId="formGroupEmail">
                        <Form.Label>Enter Email address</Form.Label>
                        <Form.Control name="email" value={this.email} onChange={this.changeEmail} type="email" placeholder="Enter email" />
                    </Form.Group>
                    <Form.Group controlId="formGroupPassword">
                        <Form.Label>Enter Password</Form.Label>
                        <Form.Control name="password" value={this.password} onChange={this.changePassword} type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Repeat password</Form.Label>
                        <Form.Control name="rePassword" id="rePassword" value={this.password} onChange={this.changeRePassword} type="password" placeholder="Repeat password" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Register
                </Button>
                </Form>
            </Container>
        )
    }
}

export default Register;