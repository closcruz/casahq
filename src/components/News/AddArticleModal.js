import React, { useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import {
  Button,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField
} from "@material-ui/core";

const AddArticleModal = props => {
  const [data, setData] = useState({
    title: "",
    desc: ""
  });

  const handleChange = name => e => {
    setData({ ...data, [name]: e.target.value });
  };

  const handleAdd = e => {
    e.preventDefault();
    const { addArticle } = props;
    const { title, desc } = data;
    const now = moment().format("MMMM Do YYYY");
    const article = {
      title: title,
      postedOn: now,
      desc: desc
    };
    addArticle(article);
  };

  const { handleClose, open } = props;

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle id="addArticle-dialog-title">Add New Article</DialogTitle>
      <DialogContent>
        <Container maxWidth="sm">
          <form onSubmit={handleAdd}>
            <TextField
              fullWidth
              id="title"
              label="Article Name"
              margin="dense"
              value={data.title}
              onChange={handleChange("title")}
            />
            <TextField
              fullWidth
              multiline
              id="desc"
              label="Body"
              margin="dense"
              rowsMax="4"
              value={data.desc}
              onChange={handleChange("desc")}
            />
            <Button fullWidth type="submit" variant="contained">
              Add Article
            </Button>
          </form>
        </Container>
      </DialogContent>
    </Dialog>
  );
};

AddArticleModal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  addArticle: PropTypes.func.isRequired
};

export default AddArticleModal;
