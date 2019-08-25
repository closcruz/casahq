import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { InputLabel, FormControl, MenuItem, Select } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  formControl: {
    minWidth: 200
  }
}));

const EditArticlePicker = props => {
  const options = props.articles;
  const [selected, setSelected] = useState({
    title: "test"
  });

  useEffect(() => {
    renderMenuItems();
  });

  const handleChange = e => {
    setSelected(e.target.value);
    props.handleSelectVal(e.target.value);
  };

  const renderMenuItems = () => {
    return options.map(o => (
      <MenuItem key={o.key} value={{ ...o.val(), key: o.key }}>
        {o.val().title}
      </MenuItem>
    ));
  };

  const renderValue = value => {
    return value && value.title;
  };

  const classes = useStyles();

  return (
    <form>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="member-select">Select Article to Edit</InputLabel>
        <Select
          value={selected.title}
          renderValue={() => renderValue(selected)}
          onChange={handleChange}
          inputProps={{
            name: "article",
            id: "article-select"
          }}
        >
          {renderMenuItems()}
        </Select>
      </FormControl>
    </form>
  );
};

export default EditArticlePicker;
