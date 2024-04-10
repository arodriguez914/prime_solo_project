import * as React from "react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

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

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const dispatch = useDispatch();
  const tutors = useSelector((store) => store.tutors);
  const [subject, setSubject] = useState("");
  const subjects = useSelector((store) => store.subject);
  const user = useSelector((store) => store.user);
  const [student, setStudent] = useState(user.id);
  const session = useSelector((store) => store.session);
  const pastSession = useSelector((store) => store.pastSession);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [tutor, setTutor] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    dispatch({ type: "FETCH_PAST_SESSION" });
    dispatch({ type: "FETCH_TUTORS" });
    dispatch({ type: "FETCH_UPCOMING_SESSION" });
    dispatch({ type: "FETCH_SUBJECTS" });
  }, []);

  const handleClickDelete = (sessionId) => {
    if (confirm(`Are you sure you want to cancel this session?`)) {
      dispatch({
        type: "DELETE_SESSION",
        payload: sessionId,
      });
    }
  };

  function handleClickEdit() {
    setOpen(true);
  }

  function handleCancel() {
    setOpen(false);
  }

  const handleClickEditSubmit = (sessionId) => {
      dispatch({
        type: "PUT_SESSION",
        payload: {
          student: student,
          tutor: tutor,
          subject: subject,
          startDate: startDate || "",
          endDate: endDate || "",
          sessionId
        },
      });
      setOpen(false);
  };

  function handleSelectChange(event) {
    setTutor(event.target.value);
  }

  function handleSelectSubject(event) {
    setSubject(event.target.value);
  }

  return (
    <Grid
      container
      spacing={2}
      paddingLeft={"22%"}
      paddingRight={"5%"}
      alignItems="center"
    >
      <div className="container">
        <h2>Welcome, {user.full_name}!</h2>
      </div>
      <Grid item xs={12}>
        <p className="dash-heading">My Upcoming Sessions</p>
        <Box
          borderRadius={3}
          border={"2px solid grey"}
          sx={{
            padding: "10px",
            margin: "10px",
            boxSizing: "border-box",
            backgroundColor: "darkslateblue",
          }}
        >
          <section className="session">
            {!session && (
              <h3 className="dash-heading">No upcoming sessions to display</h3>
            )}
            {session &&
              session.map((sessionItem) => {
                <p data-testid="sessionItem" key={sessionItem.id}></p>;
                return (
                  <div>
                    <Box
                      borderRadius={3}
                      border={"2px solid grey"}
                      sx={{
                        "& button": { m: 1 },
                        padding: "10px",
                        margin: "10px",
                        boxSizing: "border-box",
                        backgroundColor: "white",
                      }}
                    >
                      <h4>
                        <u>Tutor</u>
                      </h4>
                      <p sx={{ "& button": { m: 1 } }}>
                        {sessionItem.full_name}
                      </p>
                      <h4>
                        <u>Subject</u>
                      </h4>
                      <p sx={{ "& button": { m: 1 } }}>
                        {sessionItem.subject_name}
                      </p>
                      <h4>
                        <u>Start Time</u>
                      </h4>
                      <p sx={{ "& button": { m: 1 } }}>
                        {sessionItem.start_datetime}
                      </p>
                      <h4>
                        <u>End Time</u>
                      </h4>
                      <p sx={{ "& button": { m: 1 } }}>
                        {sessionItem.end_datetime}
                      </p>
                      <Button
                        variant="outlined"
                        onClick={() => handleClickEdit(sessionItem.id)}
                      >
                        EDIT
                      </Button>

                      <Modal
                        open={open}
                        onClose={handleCancel}
                        aria-labelledby="modal-modal-tutor"
                        aria-describedby="modal-modal-subject"
                      >
                        <Box sx={style}>
                          <Typography
                            id="modal-modal-date"
                            variant="h6"
                            component="h2"
                          >
                            {startDate}
                          </Typography>
                          <Typography
                            id="modal-modal-tutor"
                            variant="h6"
                            component="h2"
                          >
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
                          <Typography
                            id="modal-modal-subject"
                            variant="h6"
                            component="h2"
                          >
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
                          <Button onClick={() => handleClickEditSubmit(sessionItem.id)}
                          >
                            Submit
                          </Button>
                        </Box>
                      </Modal>

                      <Button
                        variant="outlined"
                        onClick={() => handleClickDelete(sessionItem.id)}
                      >
                        CANCEL
                      </Button>
                    </Box>
                  </div>
                );
              })}
          </section>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <p className="dash-heading">My Previous Sessions</p>
        <Box
          borderRadius={3}
          border={"2px solid grey"}
          sx={{
            padding: "10px",
            margin: "10px",
            boxSizing: "border-box",
            backgroundColor: "darkslateblue",
          }}
        >
          {!pastSession && (
            <h3 className="dash-heading">No past sessions to display</h3>
          )}
          <section className="pastSession">
            {pastSession &&
              pastSession.map((pastSessionItem) => {
                <p data-testid="sessionItem" key={pastSessionItem.id}></p>;
                return (
                  <div>
                    <Box
                      borderRadius={3}
                      border={"2px solid grey"}
                      sx={{
                        "& button": { m: 1 },
                        padding: "10px",
                        margin: "10px",
                        boxSizing: "border-box",
                        backgroundColor: "white",
                      }}
                    >
                      <h4>
                        <u>Tutor</u>
                      </h4>
                      <p sx={{ "& button": { m: 1 } }}>
                        {pastSessionItem.full_name}
                      </p>
                      <h4>
                        <u>Subject</u>
                      </h4>
                      <p sx={{ "& button": { m: 1 } }}>
                        {pastSessionItem.subject_name}
                      </p>
                      <h4>
                        <u>Start Time</u>
                      </h4>
                      <p sx={{ "& button": { m: 1 } }}>
                        {pastSessionItem.start_datetime}
                      </p>
                      <h4>
                        <u>End Time</u>
                      </h4>
                      <p sx={{ "& button": { m: 1 } }}>
                        {pastSessionItem.end_datetime}
                      </p>
                    </Box>
                  </div>
                );
              })}
          </section>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <p className="dash-heading">Feedback Received</p>
        <Box
          borderRadius={3}
          border={"2px solid grey"}
          sx={{
            padding: "10px",
            marginBottom: "100px",
            position: "static",
            boxSizing: "border-box",
            backgroundColor: "darkslateblue",
            color: "white",
          }}
        >
          <h3 className="dash-heading">No feedback received</h3>
          {!user.id && (
            // If there's no user, show login/registration links
            <Link className="navLink" to="/login">
              User Login
            </Link>
          )}
        </Box>
      </Grid>
    </Grid>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
