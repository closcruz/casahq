import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { firebaseApp } from "./base";
import { CssBaseline, Container } from "@material-ui/core";
import NavBar from "./components/Root/NavBar";
import Home from "./screens/Home";

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

  render() {
    return (
      <div>
        <CssBaseline />
        <Container maxWidth="xl">
          <BrowserRouter>
            <NavBar />
            <Switch>
              <Route exact path="/" component={Home} />
            </Switch>
          </BrowserRouter>
        </Container>
      </div>
    );
  }
}

export default Root;
