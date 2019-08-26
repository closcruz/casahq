import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
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

// TODO style this component
const useStyles = makeStyles(theme => ({}));

const AddMemberModal = props => {
  const [data, setData] = React.useState({
    name: "",
    position: "",
    email: "",
    major: ""
  });
  const [selectedDate, handleDateChange] = React.useState(null);

  const handleChange = name => e => {
    setData({ ...data, [name]: e.target.value });
  };

  const handleClearForm = () => {
    const currData = data;
    for (let x in currData) {
      currData[x] = "";
    }
    setData({ currData });
  };

  const handleAdd = e => {
    e.preventDefault();
    const { addMember } = props;
    const { name, position, email, major } = data;
    const memSince = moment(selectedDate).format("MMMM YYYY");
    const member = {
      name: name,
      position: position,
      email: email,
      major: major,
      memSince: memSince
    };
    addMember(member);
    // handleClearForm();
  };

  const { handleClose, open } = props;

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle id="addForm-dialog-title">Add New Member</DialogTitle>
      <DialogContent>
        <Container maxWidth="sm">
          <form onSubmit={handleAdd}>
            <TextField
              fullWidth
              id="name"
              label="Name"
              margin="dense"
              value={data.name}
              onChange={handleChange("name")}
            />
            <TextField
              fullWidth
              id="position"
              label="Position"
              margin="dense"
              value={data.position}
              onChange={handleChange("position")}
            />
            <TextField
              fullWidth
              id="email"
              label="Email"
              margin="dense"
              value={data.email}
              onChange={handleChange("email")}
            />
            <TextField
              fullWidth
              id="major"
              label="Major"
              margin="dense"
              value={data.major}
              onChange={handleChange("major")}
            />
            <DatePicker
              openTo="year"
              views={["year", "month"]}
              label="Pick year and month"
              value={selectedDate}
              onChange={handleDateChange}
            />
            <Button fullWidth type="submit" variant="contained">
              Add Member
            </Button>
          </form>
        </Container>
      </DialogContent>
    </Dialog>
  );
};

AddMemberModal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  addMember: PropTypes.func
};

export default AddMemberModal;
