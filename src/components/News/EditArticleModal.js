import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
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

const EditArticleModal = props => {
  const [data, setData] = React.useState({});

  const handleChange = name => e => {
    setData({ ...data, [name]: e.target.value });
  };

  const handleEdit = e => {
    e.preventDefault();
    const { editArticle } = props;
    const article = { ...data };
    editArticle(article);
  };

  const { handleClose, open } = props;
  const { title, postedOn, desc } = props.article;

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle id="editForm-dialog-title">Edit Article</DialogTitle>
      <DialogContent>
        <Container maxWidth="sm">
          <form onSubmit={handleEdit}>
            <TextField
              fullWidth
              id="title"
              label="Article Title"
              margin="dense"
              defaultValue={title}
              // value={data.name}
              onChange={handleChange("title")}
            />
            <TextField
              fullWidth
              id="date"
              label="Posted On"
              margin="dense"
              defaultValue={postedOn}
              // value={data.position}
              onChange={handleChange("postedOn")}
            />
            <TextField
              fullWidth
              multiline
              id="desc"
              label="Body"
              margin="dense"
              rowsMax="4"
              defaultValue={desc}
              // value={data.email}
              onChange={handleChange("desc")}
            />
            <Button fullWidth type="submit" variant="contained">
              Edit Article
            </Button>
          </form>
        </Container>
      </DialogContent>
    </Dialog>
  );
};

EditArticleModal.propTypes = {
  article: PropTypes.shape({
    title: PropTypes.string,
    postedOn: PropTypes.string,
    desc: PropTypes.string
  }).isRequired,
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  editArticle: PropTypes.func
};

export default EditArticleModal;
