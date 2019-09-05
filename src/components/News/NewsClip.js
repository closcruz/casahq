import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Paper } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  newsClip: {
    padding: theme.spacing(2)
  }
}));

const NewsClip = props => {
  const classes = useStyles();
  const { title, postedOn, desc } = props.details;

  return (
    <Paper className={classes.newsClip}>
      <Typography variant="h3">{title}</Typography>
      <Typography variant="subtitle2">{postedOn}</Typography>
      <Typography paragraph>{desc}</Typography>
    </Paper>
  );
};

NewsClip.propTypes = {
  details: PropTypes.shape({
    title: PropTypes.string,
    postedOn: PropTypes.string,
    desc: PropTypes.string
  })
};

export default NewsClip;
