import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

// MUI for Sidebar Testing
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import GroupsIcon from "@mui/icons-material/Groups";
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const drawerWidth = 240;

function Nav(props) {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const history = useHistory();

  // function handleClick(i) {
  //   for (i = 0; i <= 0; i++ ); 
  //     if (i === 0) {
  //     history.push("/user");
  //   } else {
  //     history.push("/schedule");
  //   } 
    
  return (
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">JC Tutors</h2>
      </Link>
      <div>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            User Login
          </Link>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <Box sx={{ display: "flex" }}>
              <CssBaseline />
              <AppBar
                position="fixed"
                sx={{
                  width: `calc(100% - ${drawerWidth}px)`,
                  ml: `${drawerWidth}px`,
                }}
              ></AppBar>
              <Drawer
                sx={{
                  width: drawerWidth,
                  flexShrink: 0,
                  "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    boxSizing: "border-box",
                  },
                }}
                variant="permanent"
                anchor="left"
              >
                <Toolbar />
                <div className="profileIcon">
                  {<AccountCircleRoundedIcon fontSize="large" />}
                </div>
                <Divider />
                <List>
                  {[
                    "Home",
                    "Schedule",
                    "Meet The Tutors",
                    "Update Profile",
                  ].map((text, index) => (
                    <ListItem key={text} disablePadding>
                      <ListItemButton >
                        <ListItemIcon>
                          <Link to="/user">
                          {index === 0 && <HomeRoundedIcon fontSize="medium" />}
                          </Link>
                          <Link to="/schedule">
                          {index === 1 && (
                            <CalendarMonthRoundedIcon fontSize="medium" />
                          )} </Link>
                          <Link>
                          {index === 2 && <GroupsIcon fontSize="medium" />}
                          </Link>
                          <Link>{index === 3 && (
                            <ManageAccountsRoundedIcon fontSize="medium" />
                          )}</Link>
                        </ListItemIcon>
                        <ListItemText primary={text} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
                <Divider />
                <div className="logOutSidebar">
                  <List>
                    {["Log Out"].map((text, index) => (
                      <ListItem key={text} disablePadding>
                        <ListItemButton
                          onClick={() => dispatch({ type: "LOGOUT" })}
                        >
                          <ListItemIcon>
                            {<ExitToAppRoundedIcon fontSize="medium" />}
                          </ListItemIcon>
                          <ListItemText primary={text} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </div>
              </Drawer>
            </Box>
            <Link className="logo" to="/user">
              JC TUTORS
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Nav;
