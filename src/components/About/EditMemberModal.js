import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Paper,
  TextField,
  Typography
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({}));

const EditMemberModal = props => {
  const [data, setData] = React.useState({
    name: "",
    position: "",
    email: "",
    major: "",
    memSince: ""
  });

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
    const { name, position, email, major, memSince } = data;
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
      <DialogTitle id="editForm-dialog-title">Edit Member List</DialogTitle>
      <DialogContent>
        <Grid container>
          <Grid item sm={12} md={6}>
            <form onSubmit={handleAdd}>
              <TextField
                id="name"
                label="Name"
                margin="dense"
                value={data.name}
                onChange={handleChange("name")}
              />
              <TextField
                id="position"
                label="Position"
                margin="dense"
                value={data.position}
                onChange={handleChange("position")}
              />
              <TextField
                id="email"
                label="Email"
                margin="dense"
                value={data.email}
                onChange={handleChange("email")}
              />
              <TextField
                id="major"
                label="Major"
                margin="dense"
                value={data.major}
                onChange={handleChange("major")}
              />
              <TextField
                id="memSince"
                label="Member Since"
                margin="dense"
                value={data.memSince}
                onChange={handleChange("memSince")}
              />
              <Button type="submit" variant="contained">
                Add Member
              </Button>
            </form>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default EditMemberModal;
