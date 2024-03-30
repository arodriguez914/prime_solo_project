import * as React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// MUI
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

// Full Calendar
import FullCalendar from "@fullcalendar/react";
import { formatDate } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import timeGridPlugin from "@fullcalendar/timegrid";
import { INITIAL_EVENTS, createEventId } from "./event-utils";

function SchedulePage() {
  // CREATE DISPATCH HERE TO CREATE EVENTS ... snackbar .. modal
  // const handleChange = (event) => {
  //   setTutor(event.target.value);
  //   setSubject(event.target.value);
  // };

  // placeholder text for tutor and subject
  const subject = useSelector((store) => store.subject);
  const tutors = useSelector((store) => store.tutors);
  const user= useSelector((store) => store. user);
  const session= useSelector((store) => store. session);

  // calendar events
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [currentEvents, setCurrentEvents] = useState([]);

  function handleWeekendsToggle() {
    setWeekendsVisible(!weekendsVisible);
  }

  function handleDateSelect(selectInfo) {
    let title = prompt("Please enter a new title for your event");
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
      dispatch({
        type: "POST_SESSION",
        payload: {
          date: session.date,
          time: session.time,
          duration: session.duration,
          subject_name: subject.subject_name,
          tutorName: tutors.tutorName,
          full_name: user.full_name
        }    
    });
  
    }
  }

  function handleEventClick(clickInfo) {
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  }

  function handleEvents(events) {
    setCurrentEvents(events);
  }

  const dispatch = useDispatch();

  const createSession = (event) => {
    event.preventDefault();

  //   dispatch({
  //     type: "POST_SESSION",
  //     payload: {
  //       date: date,
  //       time: time,
  //       duration: duration,
  //       subject_name: subject_name,
  //       tutorName: tutorName,
  //       full_name: user.full_name
  //     }    
  // });
  }; // end createSession

  return (
    <div className="sched-heading">
      <Grid>
        <Sidebar
          weekendsVisible={weekendsVisible}
          handleWeekendsToggle={handleWeekendsToggle}
          currentEvents={currentEvents}
        />
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "newAppointment",
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
          /* you can update a remote database when these fire:
           */
          customButtons={{
            newAppointment: {
              text: "Schedule Appointment",
              click: function () {
                alert("clicked the scheduling button!");
              },
            },
          }}
        />
        <div className="schedule-items">
          <FormControl required sx={{ m: 1, minWidth: 200 }}>
            <InputLabel id="demo-simple-select-required-label">
              Tutor
            </InputLabel>
            <Select
              labelId="demo-simple-select-required-label"
              id="demo-simple-select-required"
              value={tutors}
              label="Age *"
              // onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {tutors &&
                tutors.map((tutors) => {
                  return (
                    <MenuItem value={tutors.id}>{tutors.full_name}</MenuItem>
                  );
                })}
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
              // onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={subject}>{subject.id}</MenuItem>
            </Select>
          </FormControl>
        </div>
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
