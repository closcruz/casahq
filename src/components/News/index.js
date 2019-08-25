import React from "react";
import { useList } from "react-firebase-hooks/database";
import { firebaseApp } from "../../base";
import { Button, ButtonGroup, Grid } from "@material-ui/core";
import NewsClip from "./NewsClip";
import AddArticleModal from "./AddArticleModal";
import EditArticleModal from "./EditArticleModal";
import EditArticlePicker from "./EditArticlePicker";

const NewsBox = props => {
  let [articles, loading, error] = useList(
    firebaseApp.database().ref("articles")
  );

  const [addOpen, setAddOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [selectVal, setSelectVal] = React.useState({});

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
      .ref("articles/" + selectVal.key)
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

  const handleSelectVal = selected => {
    setSelectVal(selected);
  };

  const user = props.user;

  return (
    <React.Fragment>
      {/* Add/Edit controls here */}
      {user ? (
        <div>
          <ButtonGroup>
            <Button onClick={() => setAddOpen(true)}>Add Article</Button>
            <Button onClick={() => setEditOpen(true)}>Edit Article</Button>
          </ButtonGroup>
          {/* <EditEventPicker events={events} handleSelectVal={handleSelectVal} /> */}
          <EditArticlePicker
            articles={articles}
            handleSelectVal={handleSelectVal}
          />
        </div>
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
      />
      {/*
      <EditEventModal
        event={selectVal}
        open={editOpen}
        handleClose={() => setEditOpen(false)}
        editEvent={editEvent}
      /> */}
    </React.Fragment>
  );
};

export default NewsBox;
