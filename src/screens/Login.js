import React from "react";
import PropTypes from "prop-types";
import LoginForm from "../components/Login/index";

const Login = props => {
  return <LoginForm onSubmit={props.onSubmit} />;
};

Login.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default Login;
