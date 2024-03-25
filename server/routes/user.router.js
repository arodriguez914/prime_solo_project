const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);

  // const query = `
  //   SELECT * FROM "user"
  //     WHERE "id" = $1;
  // `;
  // const userId = req.params.id;

  // const queryStudents = `
  //   SELECT "user"."id", "user"."full_name", "student"."user_id" FROM "user"
  //   JOIN "student" ON "user".id = "student"."user_id"
  //   WHERE "student"."student.user_id" = $1;
  // `;

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

//   try {
//     const movieResult = pool.query(query, [userId]);
//     const movieDetails = movieResult.rows[0];
//     // movieDetails.genres = [];
//     // JS WORKS HERE
//     const genreResult = pool.query(queryGenres, [userId]);

//     movieDetails.genres = genreResult.rows;
//     res.send(movieDetails);
//   } catch (err) {
//     console.log('ERROR: Get movie details', err);
//     res.sendStatus(500);
//   }
// });

// router.post('/', (req, res) => {
//   console.log(req.body);
//   // RETURNING "id" will give us back the id of the created movie
//   const insertMovieQuery = `
//     INSERT INTO "movies"
//       ("title", "poster", "description")
//       VALUES
//       ($1, $2, $3)
//       RETURNING "id";
//   `;
//   const insertMovieValues = [
//     req.body.title,
//     req.body.poster,
//     req.body.description,
//   ];
//   // FIRST QUERY MAKES MOVIE
//   pool
//     .query(insertMovieQuery, insertMovieValues)
//     .then((result) => {
//       // ID IS HERE!
//       console.log('New Movie Id:', result.rows[0].id);
//       const createdMovieId = result.rows[0].id;

//       // Now handle the genre reference:
//       const insertMovieGenreQuery = `
//         INSERT INTO "movies_genres"
//           ("movie_id", "genre_id")
//           VALUES
//           ($1, $2);
//       `;
//       const insertMovieGenreValues = [createdMovieId, req.body.genre_id];
//       // SECOND QUERY ADDS GENRE FOR THAT NEW MOVIE
//       pool
//         .query(insertMovieGenreQuery, insertMovieGenreValues)
//         .then((result) => {
//           //Now that both are done, send back success!
//           res.sendStatus(201);
//         })
//         .catch((err) => {
//           // catch for second query
//           console.log(err);
//           res.sendStatus(500);
//         });
//     })
//     .catch((err) => {
//       // 👈 Catch for first query
//       console.log(err);
//       res.sendStatus(500);
//     });
});
// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const { full_name, is_student, parent_name, parent_email, parent_number, user_id} = req.body

  const queryText = `INSERT INTO "user" ("username", "password", "full_name", "is_student")
    VALUES ($1, $2, $3, $4) RETURNING id`;

  const queryStudent = `INSERT INTO "student" ("parent_name", "parent_email", "parent_number", "user_id")
    VALUES ($1, $2, $3, $4) RETURNING id`;

  pool
    .query(queryText, [username, password, full_name, is_student])
    .then((response) => {
      pool.query(queryStudent, [parent_name, parent_email, parent_number, user_id]).then(res.sendStatus(201)).catch(res.sendStatus(500))
      })
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
