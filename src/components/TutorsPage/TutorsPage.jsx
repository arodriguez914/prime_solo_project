import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

// MUI
import { Button } from "@mui/material";
import TutorDetails from "../TutorDetails/TutorDetails";

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
    <div className="updateFormPanel">
      <div>
        <h2 >
          <u>Meet The Tutors</u>
        </h2>
      </div>
      <section className="tutors">
        {tutors &&
          tutors.map((tutor) => {
            return (
              <div data-testid="tutorItem" key={tutor.id}>
                <h1 sx={{ '& button': { m: 2 } }}>
                <Button size="large" variant="outlined" onClick={clickTutorDetailsHandler(tutor.id)} >
                  {tutor.full_name} 
                </Button></h1>
              </div> 
            );
          })}
      </section>
    </div>
  );
}

export default TutorsPage;
