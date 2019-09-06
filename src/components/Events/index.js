import React from "react";
import { useList } from "react-firebase-hooks/database";
import { firebaseApp } from "../../base";
import { Grid } from "@material-ui/core";
import EventCard from "./EventCard";
import AddEventModal from "./AddEventModal";
import EditEventModal from "./EditEventModal";
import EventControls from "./EventControls";

const EventBox = props => {
  let [events, loading, error] = useList(firebaseApp.database().ref("events"));

  const [addOpen, setAddOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [pickerOpen, setPickerOpen] = React.useState(false);
  const [selectKey, setSelectKey] = React.useState(null);
  const [selectVal, setSelectVal] = React.useState({});
  const anchorRef = React.useRef(null);

  const addEvent = newEvent => {
    firebaseApp
      .database()
      .ref(`events/event${Date.now()}`)
      .set(
        {
          ...newEvent
        },
        err => {
          if (err) {
            console.log(
              "There was an error when trying to add a new event: " + err
            );
          } else {
            events = firebaseApp.database().ref("events");
          }
        }
      );
  };

  const editEvent = changedEvent => {
    firebaseApp
      .database()
      .ref("events/" + selectKey)
      .update(changedEvent, err => {
        if (err) {
          console.log(
            "There was an error when trying to edit this event: " + err
          );
        } else {
          events = firebaseApp.database().ref("events");
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
    setSelectKey(events[i].key);
    setSelectVal(events[i].val());
    setPickerOpen(false);
  };

  const user = props.user;

  return (
    <React.Fragment>
      {/* Add/Edit controls here */}
      {user ? (
        <EventControls
          events={events}
          handleAddOpen={handleAddOpen}
          handleEditOpen={handleEditOpen}
          handleToggle={handleToggle}
          handleClose={handleClose}
          handleSelectVal={handleSelectVal}
          pickerOpen={pickerOpen}
        />
      ) : null}
      <Grid container spacing={3}>
        {/* Event card wrapped around grid item component here */}
        {events.map(e => (
          <Grid item key={e.key} sm={12} md={3}>
            <EventCard key={e.key} index={e.key} details={e.val()} />
          </Grid>
        ))}
      </Grid>
      <AddEventModal
        open={addOpen}
        handleClose={() => setAddOpen(false)}
        addEvent={addEvent}
      />
      <EditEventModal
        event={selectVal}
        open={editOpen}
        handleClose={() => setEditOpen(false)}
        editEvent={editEvent}
      />
    </React.Fragment>
  );
};

export default EventBox;
