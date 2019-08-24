import React from "react";
import { useList } from "react-firebase-hooks/database";
import { firebaseApp } from "../../base";
import { Button, ButtonGroup, Grid } from "@material-ui/core";
import EventCard from "./EventCard";
import AddEventModal from "./AddEventModal";
import EditEventModal from "./EditEventModal";
import EditEventPicker from "./EditEventPicker";

const EventBox = () => {
  let [events, loading, error] = useList(firebaseApp.database().ref("events"));

  const [addOpen, setAddOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [selectVal, setSelectVal] = React.useState({});

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
      .ref("events/" + selectVal.key)
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

  const handleSelectVal = selected => {
    setSelectVal(selected);
  };

  return (
    <React.Fragment>
      {/* Add/Edit controls here */}
      <ButtonGroup>
        <Button onClick={() => setAddOpen(true)}>Add Event</Button>
        <Button onClick={() => setEditOpen(true)}>Edit Event</Button>
      </ButtonGroup>
      <EditEventPicker events={events} handleSelectVal={handleSelectVal} />
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
