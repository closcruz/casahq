import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { firebaseApp } from "./base";
import { CssBaseline, Container } from "@material-ui/core";
import NavBar from "./components/Root/NavBar";
import Home from "./screens/Home";
import Login from "./screens/Login";

class Root extends Component {
  state = {
    me: firebaseApp.auth().currentUser
  };

  componentDidMount() {
    firebaseApp.auth().onAuthStateChanged(me => {
      this.setState({ me });
    });
  }

  handleLogin = history => (email, password) => {
    return firebaseApp
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        return history.push("/");
      });
  };

  handleLogout = async () => {
    await firebaseApp.auth().signOut();
  };

  render() {
    const { me } = this.state;
    return (
      <div>
        <CssBaseline />
        <Container maxWidth="xl">
          <BrowserRouter>
            <NavBar userLogged={me} handleLogout={this.handleLogout} />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route
                path="/login"
                render={({ history }) => (
                  <Login onSubmit={this.handleLogin(history)} />
                )}
              />
            </Switch>
          </BrowserRouter>
        </Container>
      </div>
    );
  }
}

export default Root;
