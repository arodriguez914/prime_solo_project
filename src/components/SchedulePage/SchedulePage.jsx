import * as React from "react";
import { useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function SchedulePage() {
  return (
    <Grid container spacing={2} paddingLeft={"20%"}>
      <div className="sched-heading">
         Teacher Subject
      </div>
    </Grid>
  );
}

export default SchedulePage;
