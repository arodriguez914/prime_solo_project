import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function TutorsPage() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const movieDetails = useSelector((store) => store.movieDetails);
  
    useEffect(() => {
      dispatch({ type: 'FETCH_MOVIE_DETAILS', payload: { id } });
    }, []);
  
    const hasGenres = useMemo(() => {
      return (
        
        (movieDetails &&
          movieDetails.genres &&
          movieDetails.genres.length === 0) ||
        (movieDetails && !movieDetails.genres)
      );
    }, [movieDetails]);
  
    return (
        
      <div>
        <div>
        <h2 form className="updateFormPanel">Meet The Tutors Page</h2>
        </div>
        {movieDetails ? (
          <section>
            <h2>{movieDetails.title}</h2>
            <p>{movieDetails.description}</p>
            <p>MOVIE GENRES:</p>
            {movieDetails.genres && (
              <ul>
                {movieDetails.genres.map((genre) => {
                  return <li key={genre.id}>{genre.name}</li>;
                })}
              </ul>
            )}
            {hasGenres && <p>No attached genres</p>}
          </section>
        ) : (
          <section>
            <h2>Movie Details</h2>
            <p>No Movie Available</p>
          </section>
        )}
      </div>
  )
}

export default TutorsPage