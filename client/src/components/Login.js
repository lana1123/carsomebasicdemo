import React, { useState, useContext } from "react";
import AuthService from "../Services/AuthService";
import Message from "../components/Message";
import { AuthContext } from "../Context/AuthContext";
import "./Login.css";

const Login = (props) => {
  const [user, setUser] = useState({ username: "", password: "" });
  const [message, setMessage] = useState(null);
  const authContext = useContext(AuthContext);

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    AuthService.login(user).then((data) => {
      const { isAuthenticated, user, message } = data;
      if (isAuthenticated) {
        authContext.setUser(user);
        authContext.setIsAuthenticated(isAuthenticated);
        props.history.push("/");
      } else {
        setMessage(message);
      }
    });
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <form onSubmit={onSubmit}>
          <h3>Please sign in</h3>
          <label htmlFor="username" className="sr-only">
            Username:
          </label>
          <input
            type="text"
            name="username"
            onChange={onChange}
            className="form-control"
            placeholder="Enter Username"
          />
          <label htmlFor="password" className="sr-only">
            Password:
          </label>
          <input
            type="password"
            name="password"
            onChange={onChange}
            className="form-control"
            placeholder="Enter Password"
          />
          <button className="btn btn-log btn-primary btn-block" type="submit">
            Log in
          </button>
          <div className="message-container">
            {message ? <Message message={message} /> : null}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
