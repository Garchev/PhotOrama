import { Route, Routes } from "react-router-dom";
import { useState, useMemo } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Login from "./components/Auth/Login";
import UserDetails from "./components/Auth/UserDetails";
import Logout from "./components/Auth/Logout";
import { UserContext } from "./UserContext";
import WithAuth from "./hoc/WithAuth";
import Register from "./components/Auth/Register";
import ImageUpload from "./components/Files/ImageUpload";
import MyImages from "./components/Images/MyImages";
import AllImages from "./components/Images/AllImages";
import ImageDetails from "./components/Images/ImageDetails";
import EditImage from "./components/Images/EditImage";
import Layout from "./Layout/Layout";

function App() {
  const [user, setUser] = useState(null);
  const userValue = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
      <UserContext.Provider value={userValue}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users/login" element={<Login/>} />
          <Route path="/users/register" element={<Register/>} />
          {/* <Route path="/users/logout" element={<Logout/>} /> */}
          {/* <Route path="/users/:id/details" element={withOuth(<UserDetails/>)} /> */}
          <Route path="/users/:id/images" element={<WithAuth children={<MyImages/>} />} />
          {/* <Route path="/images/all" element={withOuth(<AllImages/>)} /> */}
          {/* <Route path="/images/upload" element={withOuth(<ImageUpload/>)} /> */}
          {/* <Route path="/images/:id/edit" element={withOuth(<EditImage/>)} /> */}
          <Route path="/images/details/:id" element={<ImageDetails />} />
        </Routes>
      </UserContext.Provider>
  );
}

export default App;
