import * as React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// MUI
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

// Full Calendar
import FullCalendar from "@fullcalendar/react";
import { formatDate } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import timeGridPlugin from "@fullcalendar/timegrid";
import { INITIAL_EVENTS, createEventId } from "./event-utils";

function SchedulePage() {
  const dispatch = useDispatch();

  // placeholder text for tutor and subject
  const tutors = useSelector((store) => store.tutors);
  const user = useSelector((store) => store.user);
  const session = useSelector((store) => store.session);
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState("");
  const [subject, setSubject] = useState("");
  const [tutor, setTutor] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // CALENDAR EVENTS STARTING HERE
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [currentEvents, setCurrentEvents] = useState([]);

  // *simply shows us weekends or not
  function handleWeekendsToggle() {
    setWeekendsVisible(!weekendsVisible);
  }

  // this is what will fire when we click a date on the calendar
  function handleDateSelect(selectInfo) {
    let calendarApi = selectInfo.view.calendar;

    //.. NOT THE SAGA THAT WILL BE SENDING TO SERVER.. THAT WILL BE type: POST_SESSION
    dispatch({
      type: "SET_SESSION",
      payload: {
        date: date,
        time: time,
        duration: duration,
        subject: subject,
        user: user.id,
        tutor: tutor.id,
      },
    });

    calendarApi.unselect(); // clear date selection
  }

  //this is what will fire when we click a date on the calendar that has been scheduled
  function handleEventClick(clickInfo) {
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
      dispatch({
        type: "DELETE_SESSION",
        payload: {
          date: clickInfo.event.start,
          time: clickInfo.event.start.timeText,
          duration: duration,
          // subject: subject.id,
          user: user.id,
          tutor: tutors.id,
        },
      });
    }
  }

  function handleEvents(events) {
    setCurrentEvents(events);
  }

  function handleSelectChange(event) {
    setTutor(event.target.value);
  }

  return (
    <div className="sched-heading">
      <Grid>
        <Sidebar
          weekendsVisible={weekendsVisible}
          handleWeekendsToggle={handleWeekendsToggle}
          currentEvents={currentEvents}
        />
        <Button onClick={handleOpen}>Open</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-tutor"
          aria-describedby="modal-modal-subject"
        >
          <Box sx={style}>
            <Typography id="modal-modal-date" variant="h6" component="h2">
              {session.time}
            </Typography>
            <Typography id="modal-modal-tutor" variant="h6" component="h2">
              <FormControl required sx={{ m: 1, minWidth: 200 }}>
                <InputLabel id="demo-simple-select-required-label">
                  Tutor
                </InputLabel>
                <Select
                  labelId="demo-simple-select-required-label"
                  id="demo-simple-select-required"
                  value={tutor}
                  label="Tutor"
                  onChange={handleSelectChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {tutors &&
                    tutors.map((tutors) => {
                      return (
                        <MenuItem value={tutors.id}>
                          {tutors.full_name}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
            </Typography>
            <Typography id="modal-modal-subject" variant="h6" component="h2">
              <FormControl required sx={{ m: 1, minWidth: 200 }}>
                <InputLabel id="demo-simple-select-required-label">
                  Subject
                </InputLabel>
                <Select
                  labelId="demo-simple-select-required-label"
                  id="demo-simple-select-required"
                  value={subject}
                  label="Subject"
                  // onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={subject}>{subject.id}</MenuItem>
                </Select>
              </FormControl>
            </Typography>
          </Box>
        </Modal>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next today",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={weekendsVisible}
          initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
          select={handleDateSelect}
          eventContent={renderEventContent} // custom render function
          eventClick={handleEventClick}
          eventsSet={handleEvents} // called after events are initialized/added/changed/removed
          eventAdd={function () {}}
          eventChange={function () {}}
          eventRemove={function () {}}
        />
      </Grid>
    </div>
  );
}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}

function Sidebar({ weekendsVisible, handleWeekendsToggle, currentEvents }) {
  return (
    <div className="demo-app-sidebar">
      <div className="demo-app-sidebar-section">
        <h2>Instructions</h2>
        <ul>
          <li>Select dates and you will be prompted to create a new event</li>
          <li>Drag, drop, and resize events</li>
          <li>Click an event to delete it</li>
        </ul>
      </div>
      <div className="demo-app-sidebar-section">
        <label>
          <input
            type="checkbox"
            checked={weekendsVisible}
            onChange={handleWeekendsToggle}
          ></input>
          toggle weekends
        </label>
      </div>
      <div className="demo-app-sidebar-section">
        <h2>All Events ({currentEvents.length})</h2>
        <ul>
          {currentEvents.map((event) => (
            <SidebarEvent key={event.id} event={event} />
          ))}
        </ul>
      </div>
    </div>
  );
}

function SidebarEvent({ event }) {
  return (
    <li key={event.id}>
      <b>
        {formatDate(event.start, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </b>
      <i>{event.title}</i>
    </li>
  );
}

export default SchedulePage;
