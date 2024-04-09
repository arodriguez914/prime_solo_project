import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

// MUI
import { Button } from "@mui/material";
import TutorDetails from "../TutorDetails/TutorDetails";
import {
  createTheme,
  alpha,
  getContrastRatio,
  ThemeProvider,
} from "@mui/material/styles";

const violetBase = "#7F00FF";
const violetMain = alpha(violetBase, 0.7);

const theme = createTheme({
  palette: {
    violet: {
      main: violetMain,
      light: alpha(violetBase, 0.5),
      dark: alpha(violetBase, 0.9),
      contrastText:
        getContrastRatio(violetMain, "#fff") > 4.5 ? "#fff" : "#111",
    },
  },
});

function TutorsPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const tutors = useSelector((store) => store.tutors);

  useEffect(() => {
    dispatch({ type: "FETCH_TUTORS" });
  }, []);

  const clickTutorDetailsHandler = (id) => (event) => {
    history.push(`/tutor/${id}`);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="updateFormPanel">
        <div>
          <h2>
            <u>Meet The Tutors</u>
          </h2>
        </div>
        <section className="tutors">
          {tutors &&
            tutors.map((tutor) => {
              return (
                <div className="tutorItem" key={tutor.id}>
                  <h1 sx={{ "& button": { m: 1 } }}>
                    <Button
                      size="large"
                      variant="contained"
                      color="violet"
                      onClick={clickTutorDetailsHandler(tutor.id)}
                    >
                      {tutor.full_name}
                    </Button>
                  </h1>
                </div>
              );
            })}
        </section>
      </div>
    </ThemeProvider>
  );
}

export default TutorsPage;
