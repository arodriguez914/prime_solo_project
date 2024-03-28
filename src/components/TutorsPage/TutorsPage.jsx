import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function TutorsPage() {
    const dispatch = useDispatch();
  const history = useHistory();
  const tutors = useSelector((store) => store.tutors);

  useEffect(() => {
    dispatch({ type: 'FETCH_TUTORS' });
  }, []);

  const clickTutorDetailsHandler = (id) => (event) => {
    history.push(`/tutors/${id}`);
  };

  return (
    <div>
      <div>
        <h2 form className="updateFormPanel">Meet The Tutors Page</h2>
        </div>
        {/* <section className="tutors">
        {tutors &&
          tutors.map((tutor) => {
            return (
              <div data-testid="tutorItem" key={tutor.id}>
                <h3>{tutor.title}</h3>
                <button onClick={clickTutorDetailsHandler(tutor.id)}>
                  DETAILS
                </button>
              </div>
            );
          })}
      </section> */}
    </div>
  )
}

export default TutorsPage