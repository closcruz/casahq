import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Container,
  Paper,
  TextField,
  Typography
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  formContainer: {
    paddingTop: theme.spacing(8)
  },
  formHeader: {
    paddingTop: theme.spacing(2)
  },
  loginForm: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  submitBtn: {
    margin: theme.spacing(2, 0, 4)
  }
}));

const LoginForm = props => {
  const [creds, setCreds] = useState({
    email: "",
    password: ""
  });

  const handleChange = name => e => {
    setCreds({ ...creds, [name]: e.target.value });
    console.log(creds);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const { onSubmit } = props;
    const { email, password } = creds;
    if (onSubmit) {
      onSubmit(email, password);
    }
    console.log();
  };

  const classes = useStyles();

  return (
    <Container className={classes.formContainer} maxWidth="sm">
      <Paper className={classes.loginForm}>
        <Typography
          className={classes.formHeader}
          component="h1"
          variant="h4"
          align="center"
        >
          Admin Log In
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            id="email"
            label="Email"
            margin="normal"
            value={creds.email}
            onChange={handleChange("email")}
          />
          <TextField
            fullWidth
            id="password"
            label="Password"
            margin="normal"
            value={creds.password}
            onChange={handleChange("password")}
          />
          <Button
            fullWidth
            className={classes.submitBtn}
            type="submit"
            variant="contained"
          >
            Log In
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default LoginForm;
