import React from "react";
import { useList } from "react-firebase-hooks/database";
import { firebaseApp } from "../../base";
import { Grid } from "@material-ui/core";
import NewsClip from "./NewsClip";
import AddArticleModal from "./AddArticleModal";
import EditArticleModal from "./EditArticleModal";
import ArticleControl from "./ArticleControls";

const NewsBox = props => {
  let [articles, loading, error] = useList(
    firebaseApp.database().ref("articles")
  );

  const [addOpen, setAddOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [pickerOpen, setPickerOpen] = React.useState(false);
  const [selectKey, setSelectKey] = React.useState(null);
  const [selectVal, setSelectVal] = React.useState({});
  const anchorRef = React.useRef(null);

  const addArticle = newArticle => {
    firebaseApp
      .database()
      .ref(`articles/article${Date.now()}`)
      .set(
        {
          ...newArticle
        },
        err => {
          if (err) {
            console.log(
              "There was an error when trying to add a new article: " + err
            );
          } else {
            articles = firebaseApp.database().ref("articles");
          }
        }
      );
  };

  const editArticle = changedArticle => {
    firebaseApp
      .database()
      .ref("articles/" + selectKey)
      .update(changedArticle, err => {
        if (err) {
          console.log(
            "There was an error when trying to edit this event: " + err
          );
        } else {
          articles = firebaseApp.database().ref("articles");
        }
      });
  };

  const deleteArticle = () => {
    firebaseApp
      .database()
      .ref("articles/" + selectKey)
      .remove();
  };

  const handleAddOpen = () => {
    setAddOpen(true);
  };

  const handleEditOpen = () => {
    setEditOpen(true);
  };

  const handleToggle = () => {
    setPickerOpen(prevOpen => !prevOpen);
  };

  const handleClose = e => {
    if (anchorRef.current && anchorRef.current.contains(e.target)) {
      return;
    }
    setPickerOpen(false);
  };

  const handleSelectVal = (e, i) => {
    setSelectKey(articles[i].key);
    setSelectVal(articles[i].val());
    setPickerOpen(false);
  };

  const user = props.user;

  return (
    <React.Fragment>
      {/* Add/Edit controls here */}
      {user ? (
        <ArticleControl
          articles={articles}
          handleAddOpen={handleAddOpen}
          handleEditOpen={handleEditOpen}
          handleToggle={handleToggle}
          handleClose={handleClose}
          handleSelectVal={handleSelectVal}
          pickerOpen={pickerOpen}
        />
      ) : null}
      {/* NewsClip  */}
      {articles.map(a => (
        <NewsClip key={a.key} index={a.key} details={a.val()} />
      ))}
      <AddArticleModal
        open={addOpen}
        handleClose={() => setAddOpen(false)}
        addArticle={addArticle}
      />
      <EditArticleModal
        article={selectVal}
        open={editOpen}
        handleClose={() => setEditOpen(false)}
        editArticle={editArticle}
        deleteArticle={deleteArticle}
      />
    </React.Fragment>
  );
};

export default NewsBox;
