import { useContext, useEffect } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserContext } from "../../UserContext";
import logo from "../../assets/logo.png";
import Cookies from "js-cookie";
import "./Header.css";
import HeaderMenu from "./HeaderMenu";

function Header() {
  const { user, setUser } = useContext(UserContext);
  // useEffect(() => {
  //   let cookie = Cookies.get("auth");
  //   if (cookie) {
  //     if (!user) {
  //       cookie = JSON.parse(cookie);
  //       setUser({
  //         loggedIn: true,
  //         user: {
  //           username: cookie.username,
  //           email: cookie.email,
  //           id: cookie.id,
  //         },
  //       });
  //     }
  //   }
  // }, [user]);

  return (
    <Navbar
      collapseOnSelect
      bg="dark"
      variant="dark"
      className="container-fluid d-flex justify-content-between"
    >
      <Navbar.Brand as={Link} to="/">
        <img
          src={logo}
          width="30"
          height="30"
          className="d-inline-block align-top ms-3"
          alt="PhotOrama logo"
        />
        PhotOrama
      </Navbar.Brand>
      <HeaderMenu user={user} />
    </Navbar>
  );
}

export default Header;
