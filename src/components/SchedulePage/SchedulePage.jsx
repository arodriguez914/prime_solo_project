import * as React from "react";
import { useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick

function SchedulePage() {
  const handleDateClick = (arg) => {
    alert(arg.dateStr);
  };

  return (
    <div className="sched-heading">
      <Grid >
        Teacher Subject
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          dateClick={handleDateClick}
        />
      </Grid>
    </div>
  );
}

export default SchedulePage;
