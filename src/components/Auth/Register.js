import React, { Component } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import './Auth.css';
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
     
    changeProp = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleError(e) {
        let errorBar = document.getElementById('error');
        errorBar.innerText = e;
        errorBar.style.display = "block";

        setTimeout(() => {
            errorBar.style.display = "none";
        }, 2000);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        try {
            userServices.checkFieldsInForm(this.state.username, this.state.password, this.state.rePassword, this.state.email);

            userServices.register(this.state.email, this.state.password, this.state.username)
                .then(user => {
                    userServices.setUserInDB(user.user, this.state.username);
                }).then(() => {
                    this.props.history.push('/users/login')
                }).catch((e) => {
                    this.handleError(e);
                })
        } catch (e) {
            this.handleError(e);
        }
    }


    render = () => {

        return (
            <Container id="authContainer" fluid="sm" >
                <Alert id="error" variant="danger">Error</Alert>
                <Form onSubmit={this.handleSubmit} >
                    <Form.Group controlId="formGroupUsername">
                        <Form.Label>Enter Username </Form.Label>
                        <Form.Control name="username" value={this.username} onChange={this.changeProp} type="text" placeholder="Enter Username" />
                    </Form.Group>
                    <Form.Group controlId="formGroupEmail">
                        <Form.Label>Enter Email address</Form.Label>
                        <Form.Control name="email" value={this.email} onChange={this.changeProp} type="email" placeholder="Enter email" />
                    </Form.Group>
                    <Form.Group controlId="formGroupPassword">
                        <Form.Label>Enter Password</Form.Label>
                        <Form.Control name="password" value={this.password} onChange={this.changeProp} type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Repeat password</Form.Label>
                        <Form.Control name="rePassword" id="rePassword" value={this.password} onChange={this.changeProp} type="password" placeholder="Repeat password" />
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