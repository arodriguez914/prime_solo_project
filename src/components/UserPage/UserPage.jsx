import * as React from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const session = useSelector((store) => store.session)

  useEffect(() => {
    dispatch({ type: "GET_SESSION" });
  }, []);

  return (
    <Grid container spacing={2} paddingLeft={"22%"} paddingRight={"5%"} alignItems="center">
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
          <h3 className="dash-heading">No upcoming sessions to display
          </h3>
          
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
          <h3 className="dash-heading">No previous sessions to display</h3>
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
