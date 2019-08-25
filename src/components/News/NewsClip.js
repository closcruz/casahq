import React from "react";
import PropTypes from "prop-types";
import { Typography, Paper } from "@material-ui/core";

const NewsClip = props => {
  const { title, postedOn, desc } = props.details;

  return (
    <Paper>
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
