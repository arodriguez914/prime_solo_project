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
        
      <div className="updateFormPanel">
        <h2 >{tutorDetails.full_name}</h2>
        <h4>{tutorDetails.grades_taught}</h4>
          <section>
            ABOUT:
            <p>{tutorDetails.about}</p>
          </section>
      </div>
  )
}

export default TutorsDetails