import React, { Component } from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import Appointment from "./components/Appointment";
import PrivateRoute from "./hocs/PrivateRoute";
import UnprivateRoute from "./hocs/UnprivateRoute";
import SideDrawer from "./components/SideDrawer";
import Backdrop from "./components/Backdrop/Backdrop";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    sideDrawerOpen: false,
  };

  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  };

  backdropClickHandler = () => {
    this.setState({ sideDrawerOpen: false });
  };

  render() {
    let backdrop;

    if (this.state.sideDrawerOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler} />;
    }
    return (
      <Router basename={process.env.PUBLIC_URL + "/"}>
        <div style={{ height: "100%" }}>
          <Navbar
            drawerClickHandler={this.drawerToggleClickHandler}
            {...this.props}
          />
          <SideDrawer show={this.state.sideDrawerOpen} />
          {backdrop}
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/home" component={Home} />
            <UnprivateRoute path="/login" component={Login} />
            <UnprivateRoute path="/register" component={Register} />
            <PrivateRoute path="/appointment" component={Appointment} />
            {/* <Route path="/appointment" component={Appointment} /> */}
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
