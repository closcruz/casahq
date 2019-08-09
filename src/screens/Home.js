import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  welcome: {
    ...theme.typography,
    [theme.breakpoints.down("sm")]: {
      fontSize: "3.5rem"
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "6rem"
    }
  }
}));

export default function Home() {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item sm>
        <Typography className={classes.welcome} variant="h1" align="center">
          Welcome to CASA
        </Typography>
      </Grid>
    </Grid>
  );
}
