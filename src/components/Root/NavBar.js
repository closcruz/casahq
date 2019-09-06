import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import {
  AppBar,
  Button,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Toolbar,
  Typography
} from "@material-ui/core";
import { Settings as SettingIcon, Menu as MenuIcon } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  rootBar: {
    backgroundColor: "#1F4495"
  },
  navHeader: {
    color: "#FF8A23",
    textDecoration: "none",
    flex: 1
  },
  navLinks: {
    color: "#FF8A23",
    fontSize: "1.3rem",
    padding: "0 8px"
  }
}));

const LinkMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = e => {
    setAnchorEl(e.currentTarget);
  };

  return (
    <React.Fragment>
      <IconButton
        aria-controls="links-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="links-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem
          component={RouterLink}
          to="/news"
          onClick={() => setAnchorEl(null)}
        >
          News
        </MenuItem>
        <MenuItem
          component={RouterLink}
          to="/events"
          onClick={() => setAnchorEl(null)}
        >
          Events
        </MenuItem>
        <MenuItem
          component={RouterLink}
          to="/about"
          onClick={() => setAnchorEl(null)}
        >
          About Us
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

const NavBar = props => {
  const classes = useStyles();
  const { userLogged, handleLogout } = props;
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return (
    <AppBar className={classes.rootBar} position="static">
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
        {width > 420 ? (
          <div>
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
          </div>
        ) : (
          <LinkMenu />
        )}
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
};

NavBar.propTypes = {
  userLogged: PropTypes.object
};

export default NavBar;
