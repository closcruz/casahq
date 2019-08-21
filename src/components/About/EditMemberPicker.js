import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { InputLabel, FormControl, MenuItem, Select } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  formControl: {
    minWidth: 200
  }
}));

const EditMemberPicker = props => {
  const options = props.members;
  const [selected, setSelected] = useState({
    name: "test"
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
        {o.val().name}
      </MenuItem>
    ));
  };

  const renderValue = value => {
    return value && value.name;
  };

  const classes = useStyles();

  return (
    <form>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="member-select">Select Member to Edit</InputLabel>
        <Select
          value={selected.name}
          renderValue={() => renderValue(selected)}
          onChange={handleChange}
          inputProps={{
            name: "member",
            id: "member-select"
          }}
        >
          {renderMenuItems()}
        </Select>
      </FormControl>
    </form>
  );
};

export default EditMemberPicker;
