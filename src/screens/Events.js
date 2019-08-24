import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import EventBox from "../components/Events/index";

const useStyles = makeStyles(theme => ({
  eventHeader: {
    ...theme.typography,
    [theme.breakpoints.down("sm")]: {
      fontSize: "3.5rem"
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "6rem"
    }
  }
}));

const Events = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography className={classes.eventHeader} variant="h1" align="center">
        Events
      </Typography>
      <Typography variant="subtitle1" align="center">
        See what we are up to this month and joing us! We'll keep this updated
        so as soon as an event is planned it'll be here
      </Typography>
      {/* Event Box Here */}
      <EventBox />
    </React.Fragment>
  );
};

export default Events;
