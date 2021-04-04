import { Link } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import './Header.css';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { UserContext } from '../../UserContext';
function Header() {
    const { user, setUser } = useContext(UserContext);
    useEffect(() => {
        let cookie = Cookies.get('auth');
        if (cookie) {
            if (!user) {
                cookie = JSON.parse(cookie)
                setUser({
                    loggedIn: true,
                    user: {
                        username: cookie.username,
                        email: cookie.email,
                        id: cookie.id
                    }
                })
            }
        }
    }, [user, setUser])

    return (
        <div className="header">
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand as={Link} to="/">

                    <img
                        src="../../logo.png"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"
                    />
                    PhotOrama </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        {user != null ? <Nav.Link as={Link} to={`/images/${user.user.id}`}>My Photos</Nav.Link> : null}
                        <NavDropdown title="My Photos" id="collasible-nav-dropdown">
                            <NavDropdown.Item as={Link} to="#action/3.1">Nature</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="#action/3.2">People</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="#action/3.3">Vacation</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to="/images/upload">Upload Image </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <NavDropdown title={
                            <svg xmlns="http://www.w3.org/2000/svg"
                                width="26" height="26" fill="currentColor"
                                className="bi bi-person-circle" viewBox="0 0 16 16">
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                            </svg>}
                            drop="left" id="collasible-nav-dropdown">

                            {user != null ?
                                <NavDropdown.Item disabled>{user.user.username}</NavDropdown.Item>
                                :
                                null
                            }
                            {user != null ?
                                null
                                :
                                <NavDropdown.Item as={Link} to="/users/register">Register</NavDropdown.Item>
                            }


                            {user != null ?
                                <NavDropdown.Item as={Link} to="/users/logout">Logout</NavDropdown.Item>
                                :
                                <NavDropdown.Item as={Link} to="/users/login">Login</NavDropdown.Item>
                            }

                            <NavDropdown.Divider />
                            {user != null ?
                                <NavDropdown.Item as={Link} to={`/users/details/${user.user.id}`}>My Profile</NavDropdown.Item>
                                :
                                null
                            }
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default Header;