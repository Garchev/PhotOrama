import Cookie from 'js-cookie';
import './Header.css';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
function Header() {
    let user = Cookie.get('auth');
    if(user){
        user = JSON.parse(user).username
    }
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="/">
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
                    <Nav.Link href="/photos/upload">My Photos</Nav.Link>
                    <Nav.Link href="/users/register">Register</Nav.Link>
                    <NavDropdown title="My Photos" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Nature</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">People</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Vacation</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Nav>
                <NavDropdown title={user || "User"} drop="left" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="/users/register">Register</NavDropdown.Item>
                        <NavDropdown.Item href="/users/login">Login</NavDropdown.Item>
                        <NavDropdown.Item href="/users/logout">Logout</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header;