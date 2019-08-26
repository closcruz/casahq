import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { DatePicker } from "@material-ui/pickers";
import {
  Button,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField
} from "@material-ui/core";

// TODO Style this component
const useStyles = makeStyles(theme => ({}));

const EditEventModal = props => {
  const [data, setData] = React.useState({});
  const [selectedDate, handleDateChange] = React.useState(null);

  const handleChange = name => e => {
    setData({ ...data, [name]: e.target.value });
  };

  const handleEdit = e => {
    e.preventDefault();
    const { editEvent } = props;
    const event = { ...data };
    editEvent(event);
  };

  const { handleClose, open } = props;
  const { title, desc } = props.event;

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle id="editForm-dialog-title">Edit Event</DialogTitle>
      <DialogContent>
        <Container maxWidth="sm">
          <form onSubmit={handleEdit}>
            <TextField
              fullWidth
              id="title"
              label="Event Title"
              margin="dense"
              defaultValue={title}
              // value={data.name}
              onChange={handleChange("title")}
            />
            <TextField
              fullWidth
              multiline
              id="desc"
              label="Event Description"
              margin="dense"
              rowsMax="4"
              defaultValue={desc}
              // value={data.email}
              onChange={handleChange("desc")}
            />
            <DatePicker
              openTo="month"
              views={["month", "date"]}
              label="Select date of event"
              value={selectedDate}
              onChange={handleDateChange}
            />
            <Button fullWidth type="submit" variant="contained">
              Edit Member
            </Button>
          </form>
        </Container>
      </DialogContent>
    </Dialog>
  );
};

EditEventModal.propTypes = {
  event: PropTypes.shape({
    title: PropTypes.string,
    date: PropTypes.string,
    desc: PropTypes.string
  }).isRequired,
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  editEvent: PropTypes.func
};

export default EditEventModal;
