import { useContext } from "react";
import { useHistory, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

const WithAuth = (WrappedComponent) => {
  const Component = (props) => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    if (!user) {
      navigate("/users/login");

      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return Component;
};

export default WithAuth;
