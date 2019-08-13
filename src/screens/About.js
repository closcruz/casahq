import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import MemberBox from "../components/About/index";

const useStyles = makeStyles(theme => ({
  aboutHeader: {
    ...theme.typography,
    [theme.breakpoints.down("sm")]: {
      fontSize: "3.5rem"
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "6rem"
    }
  }
}));

const Desciption = () => {
  return (
    <Typography variant="body1">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Pellentesque
      adipiscing commodo elit at imperdiet dui. Ac tortor dignissim convallis
      aenean. Sem et tortor consequat id. Dolor morbi non arcu risus quis varius
      quam. Bibendum enim facilisis gravida neque convallis a cras semper
      auctor. Bibendum at varius vel pharetra vel turpis nunc eget lorem. Nunc
      faucibus a pellentesque sit. Id cursus metus aliquam eleifend mi in nulla
      posuere. Et sollicitudin ac orci phasellus egestas tellus rutrum tellus.
      Praesent semper feugiat nibh sed pulvinar proin. Elementum eu facilisis
      sed odio morbi quis commodo odio aenean. Turpis egestas integer eget
      aliquet nibh praesent tristique magna sit. Odio morbi quis commodo odio
      aenean sed adipiscing diam. Nisi est sit amet facilisis magna etiam
      tempor. Vehicula ipsum a arcu cursus. Cras pulvinar mattis nunc sed
      blandit libero volutpat sed cras. Pellentesque sit amet porttitor eget.
      Pretium quam vulputate dignissim suspendisse in est ante in. Metus
      vulputate eu scelerisque felis imperdiet. Ipsum dolor sit amet consectetur
      adipiscing. Sed blandit libero volutpat sed. Fermentum dui faucibus in
      ornare.
    </Typography>
  );
};

const About = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography className={classes.aboutHeader} variant="h1" align="center">
        About Us
      </Typography>
      <Grid container spacing={2}>
        <Grid item sm={12} md={6}>
          <Desciption />
        </Grid>
        <Grid
          container
          item
          spacing={2}
          sm={12}
          md={6}
          direction="column"
          alignItems="center"
        >
          {/* Member list */}
          <MemberBox />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default About;
