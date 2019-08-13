import React, { useState, useEffect } from "react";
import base from "../../base";
import { Grid } from "@material-ui/core";
import MemberCard from "./MemberCard";

const MemberBox = () => {
  const [members, setMembers] = useState({});

  useEffect(() => {
    const ref = base.syncState("members", {
      context: {
        setState: ({ members }) => setMembers({ ...members }),
        state: { members }
      },
      state: "members"
    });

    return () => {
      base.removeBinding(ref);
    };
  }, []);

  return (
    <React.Fragment>
      {Object.keys(members).map(key => (
        <Grid item>
          {/* Member card */}
          <MemberCard key={key} index={key} details={members[key]} />
        </Grid>
      ))}
    </React.Fragment>
  );
};

export default MemberBox;
