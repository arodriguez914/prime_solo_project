import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function TutorsPage() {
    const dispatch = useDispatch();
  const history = useHistory();
  const movies = useSelector((store) => store.movies);

  useEffect(() => {
    dispatch({ type: 'FETCH_MOVIES' });
  }, []);

  const clickMovieDetailsHandler = (id) => (event) => {
    history.push(`/movie/${id}`);
  };

  return (
    <div>
      <div>
        <h2 form className="updateFormPanel">Meet The Tutors Page</h2>
        </div>
      <section className="movies">
        {movies &&
          movies.map((movie) => {
            return (
              <div data-testid="movieItem" key={movie.id}>
                <h3>{movie.title}</h3>
                <button onClick={clickMovieDetailsHandler(movie.id)}>
                  DETAILS
                </button>
              </div>
            );
          })}
      </section>
    </div>
  )
}

export default TutorsPage