import React from "react";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import {
  AppBar,
  Button,
  IconButton,
  Link,
  Toolbar,
  Typography
} from "@material-ui/core";
import SettingIcon from "@material-ui/icons/Settings";

const useStyles = makeStyles(theme => ({
  navHeader: {
    textDecoration: "none",
    flex: 1
  },
  navLinks: {
    padding: "0 8px"
  }
}));

export default function NavBar(props) {
  const classes = useStyles();
  const { userLogged, handleLogout } = props;

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          className={classes.navHeader}
          component={RouterLink}
          to="/"
          variant="h3"
          color="inherit"
        >
          CASA
        </Typography>
        <Link
          className={classes.navLinks}
          component={RouterLink}
          to="/news"
          color="inherit"
        >
          News
        </Link>
        <Link
          className={classes.navLinks}
          component={RouterLink}
          to="/events"
          color="inherit"
        >
          Events
        </Link>
        <Link
          className={classes.navLinks}
          component={RouterLink}
          to="/about"
          color="inherit"
        >
          About Us
        </Link>
        {userLogged ? (
          <Button variant="contained" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <IconButton component={RouterLink} to="/login" aria-label="login">
            <SettingIcon />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
}

NavBar.propTypes = {
  userLogged: PropTypes.object
};
