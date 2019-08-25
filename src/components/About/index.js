import React from "react";
import { useList } from "react-firebase-hooks/database";
import { firebaseApp } from "../../base";
import { Button, ButtonGroup, Grid } from "@material-ui/core";
import MemberCard from "./MemberCard";
import AddMemberModal from "./AddMemberModal";
import EditMemberModal from "./EditMemberModal";
import EditMemberPicker from "./EditMemberPicker";
// import Testselect from "./testselect";

const MemberBox = props => {
  let [members, loading, error] = useList(
    firebaseApp.database().ref("members")
  );
  const [addOpen, setAddOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [selectVal, setSelectVal] = React.useState({});

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
      .ref("members/" + selectVal.key)
      .update(changedMember, err => {
        if (err) {
          console.log("There was an when editing this member: " + err);
        } else {
          members = firebaseApp.database().ref("members");
        }
      });
  };

  const handleSelectVal = selected => {
    setSelectVal(selected);
  };

  const user = props.user;

  return (
    <React.Fragment>
      {user ? (
        <div>
          <Grid item>
            <ButtonGroup>
              <Button variant="contained" onClick={() => setAddOpen(true)}>
                Add Members
              </Button>
              <Button variant="contained" onClick={() => setEditOpen(true)}>
                Edit Member
              </Button>
            </ButtonGroup>
          </Grid>
          <Grid item>
            <EditMemberPicker
              members={members}
              handleSelectVal={handleSelectVal}
            />
          </Grid>
        </div>
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
