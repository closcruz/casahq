import React, { useState, useEffect } from "react";
import { useList } from "react-firebase-hooks/database";
import { firebaseApp } from "../../base";
import { Button, Grid } from "@material-ui/core";
import MemberCard from "./MemberCard";
import EditMemberModal from "./EditMemberModal";

const MemberBox = () => {
  const [members, loading, error] = useList(
    firebaseApp.database().ref("members")
  );
  const [open, setOpen] = React.useState(false);

  const addMember = newMember => {
    firebaseApp
      .database()
      .ref("members/" + `member${Date.now()}`)
      .set({
        ...newMember
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Grid item>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Add/Edit Members
        </Button>
      </Grid>
      {members.map(m => (
        <Grid item key={m.key}>
          {/* Member card */}
          <MemberCard key={m.key} index={m.key} details={m.val()} />
        </Grid>
      ))}
      <EditMemberModal
        open={open}
        handleClose={handleClose}
        addMember={addMember}
      />
    </React.Fragment>
  );
};

export default MemberBox;
