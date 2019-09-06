import React from "react";
import { useList } from "react-firebase-hooks/database";
import { firebaseApp } from "../../base";
import { Grid } from "@material-ui/core";
import MemberCard from "./MemberCard";
import AddMemberModal from "./AddMemberModal";
import EditMemberModal from "./EditMemberModal";
import MemberControls from "./MemberControls";

const MemberBox = props => {
  let [members, loading, error] = useList(
    firebaseApp.database().ref("members")
  );
  const [addOpen, setAddOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [pickerOpen, setPickerOpen] = React.useState(false);
  const [selectKey, setSelectKey] = React.useState(null);
  const [selectVal, setSelectVal] = React.useState({});
  const anchorRef = React.useRef(null);

  const addMember = newMember => {
    firebaseApp
      .database()
      .ref(`members/member${Date.now()}`)
      .set(
        {
          ...newMember
        },
        err => {
          if (err) {
            console.log("There was an error when adding to DB: " + err);
          } else {
            members = firebaseApp.database().ref("members");
          }
        }
      );
  };

  const editMember = changedMember => {
    firebaseApp
      .database()
      .ref("members/" + selectKey)
      .update(changedMember, err => {
        if (err) {
          console.log("There was an when editing this member: " + err);
        } else {
          members = firebaseApp.database().ref("members");
        }
      });
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
    setSelectKey(members[i].key);
    setSelectVal(members[i].val());
    setPickerOpen(false);
  };

  const user = props.user;

  return (
    <React.Fragment>
      {user ? (
        <Grid item>
          <MemberControls
            members={members}
            handleToggle={handleToggle}
            handleAddOpen={handleAddOpen}
            handleEditOpen={handleEditOpen}
            handleClose={handleClose}
            handleSelectVal={handleSelectVal}
            pickerOpen={pickerOpen}
          />
        </Grid>
      ) : null}
      {members.map(m => (
        <Grid item key={m.key}>
          {/* Member card */}
          <MemberCard key={m.key} index={m.key} details={m.val()} />
        </Grid>
      ))}
      <AddMemberModal
        open={addOpen}
        handleClose={() => setAddOpen(false)}
        addMember={addMember}
      />
      <EditMemberModal
        open={editOpen}
        member={selectVal}
        handleClose={() => setEditOpen(false)}
        editMember={editMember}
      />
    </React.Fragment>
  );
};

export default MemberBox;
