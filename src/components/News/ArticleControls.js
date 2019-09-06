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

const ArticleControl = props => {
  const {
    articles,
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
    setCurrSelected(articles[i].val().title);
    handleSelectVal(e, i);
  };

  return (
    <React.Fragment>
      <ButtonGroup variant="contained" ref={anchorRef}>
        <Button onClick={handleAddOpen}>Add Article</Button>
        <Button disabled={currSelected === null} onClick={handleEditOpen}>
          {currSelected ? "Edit Article" : "Select Article"}
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
                  {articles.map((a, i) => (
                    <MenuItem
                      key={a.key}
                      onClick={e => handleSelectAndShow(e, i)}
                    >
                      {a.val().title}
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

ArticleControl.propTypes = {
  articles: PropTypes.array.isRequired,
  handleToggle: PropTypes.func.isRequired,
  handleAddOpen: PropTypes.func.isRequired,
  handleEditOpen: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSelectVal: PropTypes.func.isRequired,
  pickerOpen: PropTypes.bool.isRequired
};

export default ArticleControl;
