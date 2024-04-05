import * as React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useEffect } from "react";

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
let calendarApi;
function SchedulePage() {
  const dispatch = useDispatch();

  // placeholder text for tutor and subject
  const tutors = useSelector((store) => store.tutors);
  const user = useSelector((store) => store.user);
  const subjects = useSelector((store) => store.subject);
  const students = useSelector((store) => store.students);
  const session = useSelector((store) => store.session);
  const [startDate, setStartDate] = useState("");
  const [student, setStudent] = useState("");
  const [endDate, setEndDate] = useState("");
  const [subject, setSubject] = useState("");
  const [tutor, setTutor] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    dispatch({ type: "FETCH_TUTORS" });
  }, []);

  useEffect(() => {
    dispatch({ type: "FETCH_SUBJECTS" });
  }, []);

  useEffect(() => {
    dispatch({ type: "FETCH_STUDENTS" });
  }, []);

  // CALENDAR EVENTS STARTING HERE
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [currentEvents, setCurrentEvents] = useState([]);

  // *simply shows us weekends or not
  function handleWeekendsToggle() {
    setWeekendsVisible(!weekendsVisible);
  }

  // this is what will fire when we click a date on the calendar
  function handleDateSelect(selectInfo) {
    console.log(selectInfo);
    calendarApi = selectInfo.view.calendar;
    setStartDate(selectInfo.startStr);
    setEndDate(selectInfo.endStr);
    setOpen(true);
  }

  function handleSubmitDate() {
    console.log('Student:', student);
    console.log('Subject:', subject);
    // axios
    //   .post("/api/session/schedule", {
      //   startDate: startDate,
      //   endDate: endDate,
      //   student: {
      //     id: 8,
      //   },
      //   tutor: {
      //     id: 6,
      //   },
      //   subject: {
      //     id: 2,
      //   },
      // })
      // .then(() => {
      //   console.log("success");
      // })
      // .catch((e) => {
      //   console.log("e", e);
      // });
    dispatch({
      type: "POST_SESSION",
      payload: {
      startDate: startDate,
      endDate: endDate,
      scheduler: students,
      tutor: tutor,
      subject: subject,
    }
  });
  setOpen(false);
  }

  function handleCancel() {
    calendarApi.unselect(); // clear date selection
    setOpen(false);
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

  function addEvent(event) {
    console.log("addEvent", event);
  }

  function handleEvents(events) {
    setCurrentEvents(events);
    console.log("addEvent", events);
  }

  function handleSelectChange(event) {
    setTutor(event.target.value);
  }

  function handleSelectSubject(event) {
    setSubject(event.target.value);
  }

  return (
    <div className="sched-heading">
      <Grid>
        <Sidebar
          weekendsVisible={weekendsVisible}
          handleWeekendsToggle={handleWeekendsToggle}
          currentEvents={currentEvents}
        />
        <Modal
          open={open}
          onClose={handleCancel}
          aria-labelledby="modal-modal-tutor"
          aria-describedby="modal-modal-subject"
        >
          <Box sx={style}>
            <Typography id="modal-modal-date" variant="h6" component="h2">
              {startDate}
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
                    tutors.map((tutorItem) => {
                      return (
                        <MenuItem value={tutorItem.id}>
                          {tutorItem.full_name}
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
                  onChange={handleSelectSubject}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {subjects &&
                    subjects.map((subjectItem) => {
                      return (
                        <MenuItem value={subjectItem.id}>
                          {subjectItem.subject_name}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
            </Typography>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button onClick={handleSubmitDate}>Submit</Button>
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
          eventAdd={addEvent}
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

function Sidebar({ weekendsVisible, handleWeekendsToggle, }) {
  return (
    <div className="demo-app-sidebar">
      <div className="demo-app-sidebar-section">
        <h1>Instructions</h1>
        <ul>
          <li>Select date and time and you will be prompted to create a new event</li>
          <li>Select tutor and subject to confirm appointment</li>
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
          Toggle Weekends
        </label>
      </div>
      </div>
  );
}

export default SchedulePage;
