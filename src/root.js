import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { firebaseApp } from "./base";
import { CssBaseline, Container } from "@material-ui/core";
import NavBar from "./components/Root/NavBar";
import Home from "./screens/Home";
import About from "./screens/About";
import Login from "./screens/Login";

const Root = () => {
  const [user, init, error] = useAuthState(firebaseApp.auth());

  const handleLogin = history => (email, password) => {
    return firebaseApp
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        return history.push("/");
      });
  };

  const handleLogout = async () => {
    await firebaseApp.auth().signOut();
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xl">
        <BrowserRouter>
          <NavBar userLogged={user} handleLogout={handleLogout} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route
              path="/login"
              render={({ history }) => (
                <Login onSubmit={handleLogin(history)} />
              )}
            />
          </Switch>
        </BrowserRouter>
      </Container>
    </React.Fragment>
  );
};

export default Root;
