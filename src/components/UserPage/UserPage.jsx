import * as React from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const session = useSelector((store) => store.session);
  const pastSession = useSelector((store) => store.pastSession);

  useEffect(() => {
    dispatch({ type: "FETCH_PAST_SESSION" });
    dispatch({ type: "FETCH_UPCOMING_SESSION" });
    dispatch({ type: "FETCH_SUBJECTS" });
  }, []);

  // function handleClickDelete(sessionId) {
  //   if (
  //     confirm(
  //       `Are you sure you want to delete the event`
  //     )
  //   ) {
  //     ;
  //     dispatch({
  //       type: "DELETE_SESSION",
  //       payload: {
  //         sessionId
  //       },
  //     });
  //   }
  // }

  // function handleClickDelete(sessionId) {
  //   console.log("trying to delete session: ", session.id);

  //   dispatch({ type: "DELETE_SESSION", payload: sessionId });
  // }

  const handleClickDelete = (id) => {
    console.log('SESSION TO BE DELETED ID: ', id);
    dispatch({ type: 'DELETE_SESSION', payload: id });
  };

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
            backgroundColor: "lightgrey",
          }}
        >
          {!session && (
            <h3 className="dash-heading">No upcoming sessions to display</h3>
          )}
          <section className="session">
            {session &&
              session.map((sessionItem) => {
                <p data-testid="sessionItem" key={sessionItem.id}></p>
                return (
                  <div >
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
                      <Button variant="outlined">EDIT</Button>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={handleClickDelete ( sessionItem )}
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
      <Grid item xs={6}>
        <p className="dash-heading">My Previous Sessions</p>
        <Box
          borderRadius={3}
          border={"2px solid grey"}
          sx={{
            padding: "10px",
            margin: "10px",
            boxSizing: "border-box",
            backgroundColor: "lightgrey",
          }}
        >
          {!pastSession && (
            <h3 className="dash-heading">No past sessions to display</h3>
          )}
          <section className="pastSession">
            {pastSession &&
              pastSession.map((pastSessionItem) => {
                <p data-testid="sessionItem" key={pastSessionItem.id}></p>
                return (
                  <div >
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
      <Grid item xs={6}>
        <p className="dash-heading">Feedback Received</p>
        <Box
          borderRadius={3}
          border={"2px solid grey"}
          sx={{
            padding: "10px",
            margin: "10px",
            boxSizing: "border-box",
            backgroundColor: "lightgrey",
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
