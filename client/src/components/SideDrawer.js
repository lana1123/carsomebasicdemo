import React, { useContext } from "react";
import AuthService from "../Services/AuthService";
import { AuthContext } from "../Context/AuthContext";
import "./SideDrawer.css";
import { Link } from "react-router-dom";

const SideDrawer = (props) => {
  const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(
    AuthContext
  );

  const onClickLogoutHandler = () => {
    AuthService.logout().then((data) => {
      if (data.success) {
        setUser(data.user);
        setIsAuthenticated(false);
      }
    });
  };

  let drawerClasses = "side-drawer";
  if (props.show) {
    drawerClasses = "side-drawer open";
  }

  const unauthenticatedNavBar = () => {
    return (
      <>
        <li>
          <a href="/">
            <Link to="/home" className="navbar-entry">
              Home
            </Link>
          </a>
        </li>
        <li>
          <a href="/">
            <Link to="/login" className="navbar-entry">
              Login
            </Link>
          </a>
        </li>
        <li>
          <a href="/">
            <Link to="/register" className="navbar-entry">
              Register
            </Link>
          </a>
        </li>
      </>
    );
  };

  const authenticatedNavBar = () => {
    return (
      <>
        <li>
          <a href="/">
            <Link to="/" className="navbar-entry">
              Home
            </Link>
          </a>
        </li>
        <li>
          <a href="/">
            <Link to="/appointment" className="navbar-entry">
              Appointment
            </Link>
          </a>
        </li>
        <button
          type="button"
          className="side-drawer-button"
          onClick={onClickLogoutHandler}
        >
          Logout
        </button>
      </>
    );
  };

  return (
    <nav className={drawerClasses}>
      <ul>
        {!isAuthenticated ? unauthenticatedNavBar() : authenticatedNavBar()}
      </ul>
    </nav>
  );
};

export default SideDrawer;
