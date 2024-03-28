import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function TutorsDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const tutorDetails = useSelector((store) => store.tutorDetails);
  
    useEffect(() => {
      dispatch({ type: 'FETCH_TUTOR_DETAILS', payload: { id } });
    }, []);
  
    return (
        
      <div>
        <div>
        <h2 form className="updateFormPanel">Meet The Tutors Page</h2>
        </div>
        {tutorDetails ? (
          <section>
            <img src="{tutorDetails.img}" alt="" />
            <h2>{tutorDetails.full_name}</h2>
            <p>{tutorDetails.grades_taught}</p>
            ABOUT:
            <p>{tutorDetails.about}</p>
          </section>
        ) : (
          <section>
            <h2>Tutor Details</h2>
            <p>No Tutor Details Available</p>
          </section>
        )}
      </div>
  )
}

export default TutorsDetails