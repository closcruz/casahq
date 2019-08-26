import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import NewsBox from "../components/News/index";

const useStyles = makeStyles(theme => ({
  headerBlock: {
    paddingBottom: theme.spacing(4)
  },
  newsHeader: {
    ...theme.typography,
    [theme.breakpoints.down("sm")]: {
      fontSize: "3.5rem"
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "6rem"
    }
  }
}));

const News = props => {
  const classes = useStyles();
  const user = props.userLogged;

  return (
    <React.Fragment>
      <div className={classes.headerBlock}>
        <Typography className={classes.newsHeader} variant="h1">
          News
        </Typography>
        <Typography variant="subtitle1">
          What's up with the organization? Any updates and news relating to the
          organization or what we find interesting is below.
        </Typography>
      </div>
      {/* NewsBox goes here */}
      <NewsBox user={user} />
    </React.Fragment>
  );
};

export default News;
