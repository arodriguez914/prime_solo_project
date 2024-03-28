const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    const query = `
      SELECT * FROM "movies"
        ORDER BY "title" ASC;
    `;
    pool
      .query(query)
      .then((result) => {
        res.send(result.rows);
      })
      .catch((err) => {
        console.log('ERROR: Get all movies', err);
        res.sendStatus(500);
      });
  });
  
  router.get('/:id', async (req, res) => {
    // ARRAY_AGG()
    const query = `
      SELECT * FROM "movies"
        WHERE "id" = $1;
    `;
    const movieId = req.params.id;
  
    const queryGenres = `
      SELECT "genres".id, "genres".name, "movies_genres"."movie_id" AS "movie_id" FROM "genres"
      JOIN "movies_genres" ON "genres".id = "movies_genres"."genre_id"
      WHERE "movies_genres"."movie_id" = $1;
    `;
  
    // pool
    //   .query(query, [movieId])
    //   .then((movieResult) => {
    //     pool
    //       .query(queryGenres, [movieId])
    //       .then((genreResult) => {
    //         const movieDetails = movieResult.rows[0];
    //         const movieGenres = genreResult.rows;
  
    //         movieDetails.genres = movieGenres;
  
    //         res.send(movieDetails);
    //       })
    //       .catch((err) => {
    //         console.log('ERROR: Get movie details', err);
    //         res.sendStatus(500);
    //       });
    //   })
    //   .catch((err) => {
    //     console.log('ERROR: Get movie details', err);
    //     res.sendStatus(500);
    //   });
  
    try {
      const movieResult = await pool.query(query, [movieId]);
      const movieDetails = movieResult.rows[0];
      // movieDetails.genres = [];
      // JS WORKS HERE
      const genreResult = await pool.query(queryGenres, [movieId]);
  
      movieDetails.genres = genreResult.rows;
      res.send(movieDetails);
    } catch (err) {
      console.log('ERROR: Get movie details', err);
      res.sendStatus(500);
    }
  });
  
  router.post('/', (req, res) => {
    console.log(req.body);
    // RETURNING "id" will give us back the id of the created movie
    const insertMovieQuery = `
      INSERT INTO "movies"
        ("title", "poster", "description")
        VALUES
        ($1, $2, $3)
        RETURNING "id";
    `;
    const insertMovieValues = [
      req.body.title,
      req.body.poster,
      req.body.description,
    ];
    // FIRST QUERY MAKES MOVIE
    pool
      .query(insertMovieQuery, insertMovieValues)
      .then((result) => {
        // ID IS HERE!
        console.log('New Movie Id:', result.rows[0].id);
        const createdMovieId = result.rows[0].id;
  
        // Now handle the genre reference:
        const insertMovieGenreQuery = `
          INSERT INTO "movies_genres"
            ("movie_id", "genre_id")
            VALUES
            ($1, $2);
        `;
        const insertMovieGenreValues = [createdMovieId, req.body.genre_id];
        // SECOND QUERY ADDS GENRE FOR THAT NEW MOVIE
        pool
          .query(insertMovieGenreQuery, insertMovieGenreValues)
          .then((result) => {
            //Now that both are done, send back success!
            res.sendStatus(201);
          })
          .catch((err) => {
            // catch for second query
            console.log(err);
            res.sendStatus(500);
          });
      })
      .catch((err) => {
        // 👈 Catch for first query
        console.log(err);
        res.sendStatus(500);
      });
  });
  
  module.exports = router;

module.exports = router;