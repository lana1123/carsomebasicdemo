import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthService from "../Services/AuthService";
import { AuthContext } from "../Context/AuthContext";
import "./Navbar.css";
import DrawerToggleButton from "./DrawerToggleButton";

const Navbar = (props) => {
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

  const unauthenticatedNavBar = () => {
    return (
      <>
        <li>
          <a href="/">
            <Link to="/home">
              <li className="navbar-ul-container-li">Home</li>
            </Link>
          </a>
        </li>
        <li>
          <a href="/">
            <Link to="/login">
              <li className="navbar-ul-container-li">Login</li>
            </Link>
          </a>
        </li>
        <li>
          <a href="/">
            <Link to="/register">
              <li className="navbar-ul-container-li">Register</li>
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
            <Link to="/">
              <li className="navbar-ul-container-li">Home</li>
            </Link>
          </a>
        </li>
        <li>
          <a href="/">
            <Link to="/appointment">
              <li className="navbar-ul-container-li">Appointment</li>
            </Link>
          </a>
        </li>
        <button
          type="button"
          className="navbar-ul-container-li"
          onClick={onClickLogoutHandler}
        >
          Logout
        </button>
      </>
    );
  };

  return (
    <header className="toolbar">
      <nav className="toolbar__navigation">
        <div className="toolbar__toggle-button">
          <DrawerToggleButton click={props.drawerClickHandler} />
        </div>
        {/* <div className="toolbar__logo">
          <h2>Carsome</h2>
        </div>

        <div className="spacer" /> */}
        <div className="toolbar_navigation-items">
          <ul>
            {!isAuthenticated ? unauthenticatedNavBar() : authenticatedNavBar()}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
