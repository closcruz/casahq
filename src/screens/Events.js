import React from "react";
import DateMomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import EventBox from "../components/Events/index";

const useStyles = makeStyles(theme => ({
  headerBlock: {
    paddingBottom: theme.spacing(4)
  },
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

const Events = props => {
  const classes = useStyles();
  const user = props.userLogged;

  return (
    <React.Fragment>
      <div className={classes.headerBlock}>
        <Typography className={classes.eventHeader} variant="h1" align="center">
          Events
        </Typography>
        <Typography variant="subtitle1" align="center">
          See what we are up to this month and joing us! We'll keep this updated
          so as soon as an event is planned it'll be here
        </Typography>
      </div>
      <MuiPickersUtilsProvider utils={DateMomentUtils}>
        {/* Event Box Here */}
        <EventBox user={user} />
      </MuiPickersUtilsProvider>
    </React.Fragment>
  );
};

export default Events;
