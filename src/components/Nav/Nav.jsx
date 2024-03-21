import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

// MUI for Sidebar Testing
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
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
                  <ListItemButton onClick={() => history.push("/user")}>
                    <ListItemIcon>
                      {<HomeRoundedIcon fontSize="medium" />}
                    </ListItemIcon>
                    <ListItem>Home</ListItem>
                  </ListItemButton>

                  <ListItemButton onClick={() => history.push("/schedule")}>
                    <ListItemIcon>
                      {<CalendarMonthRoundedIcon fontSize="medium" />}
                    </ListItemIcon>
                    <ListItem>Schedule</ListItem>
                  </ListItemButton>

                  <ListItemButton onClick={() => history.push("/user")}>
                    <ListItemIcon>
                      {<GroupsIcon fontSize="medium" />}
                    </ListItemIcon>
                    <ListItem>Meet The Tutors</ListItem>
                  </ListItemButton>

                  <ListItemButton onClick={() => history.push("/user")}>
                    <ListItemIcon>
                      {<ManageAccountsRoundedIcon fontSize="medium" />}
                    </ListItemIcon>
                    <ListItem>Update Profile</ListItem>
                  </ListItemButton>
                </List>
                <Divider />
                <div className="logOutSidebar">
                  <List>
                    <ListItemButton onClick={() => dispatch({ type: "LOGOUT" })}>
                    <ListItemIcon>
                      {<ExitToAppRoundedIcon fontSize="medium" />}
                    </ListItemIcon>
                    <ListItem>Log Out</ListItem>
                  </ListItemButton>
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
