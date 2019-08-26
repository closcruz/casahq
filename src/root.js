import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { firebaseApp } from "./base";
import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline, Container } from "@material-ui/core";
import NavBar from "./components/Root/NavBar";
import Home from "./screens/Home";
import News from "./screens/News";
import Events from "./screens/Events";
import About from "./screens/About";
import Login from "./screens/Login";

const useStyles = makeStyles(theme => ({
  root: {
    paddingLeft: 0,
    paddingRight: 0
  },
  [theme.breakpoints.down("sm")]: {
    contentContainer: {
      paddingTop: theme.spacing(4),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  [theme.breakpoints.up("md")]: {
    contentContainer: {
      paddingTop: theme.spacing(8),
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4)
    }
  }
}));

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

  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <Container className={classes.root} maxWidth="xl">
        <BrowserRouter>
          <NavBar userLogged={user} handleLogout={handleLogout} />
          <div className={classes.contentContainer}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/news" render={() => <News userLogged={user} />} />
              <Route
                path="/events"
                render={() => <Events userLogged={user} />}
              />
              <Route path="/about" render={() => <About userLogged={user} />} />
              <Route
                path="/login"
                render={({ history }) => (
                  <Login onSubmit={handleLogin(history)} />
                )}
              />
            </Switch>
          </div>
        </BrowserRouter>
      </Container>
    </React.Fragment>
  );
};

export default Root;
