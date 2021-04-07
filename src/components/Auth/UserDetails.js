import {  useContext } from 'react';
import { Link } from 'react-router-dom';

import { Container } from 'react-bootstrap';
import { UserContext } from '../../UserContext';
import './Auth.css';



function UserDetails() {

    const { user } = useContext(UserContext).user;
    
    return (

        <Container fluid="sm" id="authContainer" className="userDetails" >

            <h2>User Info:</h2>
            <div>
                <h6>Username: </h6> 
                <h3>{user.username}</h3>
            </div>
            <div>
                <h5>Email: </h5>
                <h3>{user.email}</h3>
            </div>
            <div>
                <h5><Link to={`/users/${user.id}/images`}>My Images</Link> </h5>
            </div>
        </Container>
    )
}

export default UserDetails;