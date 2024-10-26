import { useContext } from "react";
import { UserContext } from "../../UserContext";
import { logout } from "../../services/user";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  logout().then(() => {
    setUser(null);
    navigate("/");
  });

  return null;
}

export default Logout;
