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
  Grid,
  TextField
} from "@material-ui/core";

// TODO Style this component
const useStyles = makeStyles(theme => ({}));

const EditMemberModal = props => {
  const { editMember, deleteMember, handleClose, open } = props;
  const [data, setData] = React.useState({});
  const [selectedDate, handleDateChange] = React.useState(null);

  const handleChange = name => e => {
    setData({ ...data, [name]: e.target.value });
  };

  const handleEdit = e => {
    e.preventDefault();
    const member = {
      ...data,
      memSince: moment(selectedDate).format("MMMM YYYY")
    };
    editMember(member);
  };

  // const handleDelete = e => {
  //   e.preventDefault();
  //   deleteMember;
  //   handleClose;
  // };

  const { name, position, email, major, memSince } = props.member;

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle id="editForm-dialog-title">Edit Member List</DialogTitle>
      <DialogContent>
        <Container maxWidth="sm">
          <form onSubmit={handleEdit}>
            <TextField
              fullWidth
              id="name"
              label="Name"
              margin="dense"
              defaultValue={name}
              onChange={handleChange("name")}
            />
            <TextField
              fullWidth
              id="position"
              label="Position"
              margin="dense"
              defaultValue={position}
              onChange={handleChange("position")}
            />
            <TextField
              fullWidth
              id="email"
              label="Email"
              margin="dense"
              defaultValue={email}
              onChange={handleChange("email")}
            />
            <TextField
              fullWidth
              id="major"
              label="Major"
              margin="dense"
              defaultValue={major}
              onChange={handleChange("major")}
            />
            <DatePicker
              openTo="year"
              views={["year", "month"]}
              label="Pick year and month"
              value={selectedDate}
              onChange={handleDateChange}
            />
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Button fullWidth type="submit" variant="contained">
                  Edit Member
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <Button fullWidth variant="contained" onClick={deleteMember}>
                  Delete Member
                </Button>
              </Grid>
            </Grid>
          </form>
        </Container>
      </DialogContent>
    </Dialog>
  );
};

EditMemberModal.propTypes = {
  member: PropTypes.shape({
    name: PropTypes.string,
    position: PropTypes.string,
    email: PropTypes.string,
    major: PropTypes.string,
    memSince: PropTypes.string
  }).isRequired,
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  editMember: PropTypes.func
};

export default EditMemberModal;
