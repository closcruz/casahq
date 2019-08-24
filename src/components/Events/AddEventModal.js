import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField
} from "@material-ui/core";

const AddEventModal = props => {
  const [data, setData] = useState({
    title: "",
    date: "",
    desc: ""
  });

  const handleChange = name => e => {
    setData({ ...data, [name]: e.target.value });
  };

  const handleAdd = e => {
    e.preventDefault();
    const { addEvent } = props;
    const { title, date, desc } = data;
    const event = {
      title: title,
      date: date,
      desc: desc
    };
    addEvent(event);
  };

  const { handleClose, open } = props;

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle id="addEvent-dialog-title">Add New Event</DialogTitle>
      <DialogContent>
        <Container maxWidth="sm">
          <form onSubmit={handleAdd}>
            <TextField
              fullWidth
              id="title"
              label="Event Name"
              margin="dense"
              value={data.title}
              onChange={handleChange("title")}
            />
            <TextField
              fullWidth
              id="date"
              label="Event Date"
              margin="dense"
              value={data.date}
              onChange={handleChange("date")}
            />
            <TextField
              fullWidth
              multiline
              id="desc"
              label="Event Description"
              margin="dense"
              rowsMax="4"
              value={data.desc}
              onChange={handleChange("desc")}
            />
            <Button fullWidth type="submit" variant="contained">
              Add Event
            </Button>
          </form>
        </Container>
      </DialogContent>
    </Dialog>
  );
};

AddEventModal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  addEvent: PropTypes.func.isRequired
};

export default AddEventModal;
