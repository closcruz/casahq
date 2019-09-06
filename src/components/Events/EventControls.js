import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import {
  Button,
  ButtonGroup,
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  MenuItem,
  MenuList
} from "@material-ui/core";

const EventControl = props => {
  const {
    events,
    handleToggle,
    handleAddOpen,
    handleEditOpen,
    handleClose,
    handleSelectVal,
    pickerOpen
  } = props;
  const [currSelected, setCurrSelected] = useState(null);
  const anchorRef = useRef(null);

  const handleSelectAndShow = (e, i) => {
    setCurrSelected(events[i].val().title);
    handleSelectVal(e, i);
  };

  return (
    <React.Fragment>
      <ButtonGroup variant="contained" ref={anchorRef}>
        <Button onClick={handleAddOpen}>Add Event</Button>
        <Button disabled={currSelected === null} onClick={handleEditOpen}>
          {currSelected ? `Edit ${currSelected} Event` : "Select Event"}
        </Button>
        <Button size="small" onClick={handleToggle}>
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        open={pickerOpen}
        anchorEl={anchorRef.current}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom"
            }}
          >
            <Paper id="event-picker-list-grow">
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList>
                  {events.map((v, i) => (
                    <MenuItem
                      key={v.key}
                      onClick={e => handleSelectAndShow(e, i)}
                    >
                      {v.val().title}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
};

EventControl.propTypes = {
  events: PropTypes.array.isRequired,
  handleToggle: PropTypes.func.isRequired,
  handleAddOpen: PropTypes.func.isRequired,
  handleEditOpen: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSelectVal: PropTypes.func.isRequired,
  pickerOpen: PropTypes.bool.isRequired
};

export default EventControl;
