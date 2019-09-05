import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Typography
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  card: {
    [theme.breakpoints.up("md")]: {
      minWidth: 600
    }
  },
  cardMemImage: {
    height: 150
  }
}));

const MemberCard = props => {
  const classes = useStyles();
  const { name, position, email, major, memSince } = props.details;

  return (
    <Card className={classes.card}>
      <Grid container>
        <Grid item sm={4}>
          <CardMedia
            className={classes.cardMemImage}
            image="https://via.placeholder.com/150"
          />
        </Grid>
        <Grid item sm={8}>
          <CardContent>
            <Typography variant="h6">
              {name} | Member Since: {memSince}
            </Typography>
            <Typography variant="body2">
              Position: {position} | Major: {major}
            </Typography>
            <Typography variant="subtitle2">Email: {email}</Typography>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

MemberCard.propTypes = {
  details: PropTypes.shape({
    name: PropTypes.string,
    position: PropTypes.string,
    email: PropTypes.string,
    major: PropTypes.string,
    memSince: PropTypes.string
  })
};

export default MemberCard;
