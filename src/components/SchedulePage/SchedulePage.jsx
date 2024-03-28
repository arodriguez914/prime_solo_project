import * as React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

// MUI
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";

// Full Calendar
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import { blueGrey, red } from "@mui/material/colors";

function SchedulePage() {
  const handleDateClick = (arg) => {
    alert(arg.dateStr);
  };
  // CREATE DISPATCH HERE TO CREATE EVENTS
  const handleChange = (event) => {
    setTutor(event.target.value);
    setSubject(event.target.value);
  };

  // placeholder text for tutor and subject
  const [tutor, setTutor] = useState(["Mrs. Collins"]);
  const subject = useSelector((store) => store.subject);

  return (
    <div className="sched-heading">
      <Grid>
        <div className="schedule-items">
          <FormControl required sx={{ m: 1, minWidth: 200 }}>
            <InputLabel id="demo-simple-select-required-label">
              Tutor
            </InputLabel>
            <Select
              labelId="demo-simple-select-required-label"
              id="demo-simple-select-required"
              value={tutor}
              label="Age *"
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={tutor}>Mrs. Collins</MenuItem>
            </Select>
          </FormControl>

          <FormControl required sx={{ m: 1, minWidth: 200 }}>
            <InputLabel id="demo-simple-select-required-label">
              Subject
            </InputLabel>
            <Select
              labelId="demo-simple-select-required-label"
              id="demo-simple-select-required"
              value={subject}
              label="Age *"
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={subject}>{subject.id}</MenuItem>
            </Select>
          </FormControl>
        </div>
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
