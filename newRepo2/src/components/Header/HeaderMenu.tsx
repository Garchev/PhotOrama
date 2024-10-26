import { Navbar, Nav, NavDropdown } from "react-bootstrap"
import { Link } from "react-router-dom"

const HeaderMenu = ({user}) => {
  return (
    <>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav" className='justify-content-between me-3'>
      <Nav className="mr-auto">
        {user != null ? (
          <NavDropdown title="My Photos" id="collasible-nav-dropdown">
            <NavDropdown.Item
              as={Link}
              to={`/users/${user.user.id}/images`}
            >
              My Images
            </NavDropdown.Item>
            <NavDropdown.Item
              as={Link}
              to="/images/all"
            >
              All users images
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item
              as={Link}
              to="/images/upload"
            >
              Upload Image
            </NavDropdown.Item>
          </NavDropdown>
        ) : null}
      </Nav>
      <Nav>
        <NavDropdown
          title={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              fill="currentColor"
              className="bi bi-person-circle"
              viewBox="0 0 16 16"
            >
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
              <path
                fillRule="evenodd"
                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
              />
            </svg>
          }
          drop="start"
          id="collasible-nav-dropdown"
        >
          {user != null ? (
            <NavDropdown.Item disabled>{user.user.username}</NavDropdown.Item>
          ) : null}
          {user != null ? null : (
            <NavDropdown.Item as={Link} to="/users/register">
              Register
            </NavDropdown.Item>
          )}

       
            <NavDropdown.Item as={Link} to={`/users/${user !== null ? 'logout' : 'login'}`}>
              {user != null ? 'Logout' : 'Login'}
            </NavDropdown.Item>

          <NavDropdown.Divider />
          {user != null ? (
            <NavDropdown.Item as={Link} to={`/users/${user.user.id}/details`}>
              My Profile
            </NavDropdown.Item>
          ) : null}
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
    </>
  );

}

export default HeaderMenu;