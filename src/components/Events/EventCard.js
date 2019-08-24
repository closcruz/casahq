import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  CardHeader,
  Typography
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  cardImage: {
    height: 150
  }
}));

const EventCard = props => {
  const { title, date, desc } = props.details;
  const classes = useStyles();

  return (
    <Card>
      <CardHeader title={title} subheader={date} />
      <CardMedia
        className={classes.cardImage}
        image="https://via.placeholder.com/150"
      />
      <CardContent>
        <Typography paragraph>{desc}</Typography>
      </CardContent>
      <CardActions>
        <Button href="https://www.facebook.com/CAstudentsUT/">
          Check it out on Facebook
        </Button>
      </CardActions>
    </Card>
  );
};

EventCard.propTypes = {
  details: PropTypes.shape({
    title: PropTypes.string,
    date: PropTypes.string,
    desc: PropTypes.string
  })
};

export default EventCard;
