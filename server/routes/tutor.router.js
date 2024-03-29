const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    const query = `
    SELECT * FROM "tutor"
    ORDER BY "full_name";`;
    pool
      .query(query)
      .then((result) => {
        res.send(result.rows);
      })
      .catch((err) => {
        console.log('ERROR: Get all tutors', err);
        res.sendStatus(500);
      });
  });

  router.get('/:id', async (req, res) => {
    // ARRAY_AGG()
    const query = `
      SELECT * FROM "tutor"
        WHERE "id" = $1;
    `;
    const tutorId = req.params.id;
  
    const queryGenres = `
      SELECT "tutor".id, "tutor".name, "movies_genres"."movie_id" AS "movie_id" FROM "genres"
      JOIN "movies_genres" ON "genres".id = "movies_genres"."genre_id"
      WHERE "movies_genres"."movie_id" = $1;
    `;

    try {
        const tutorResult = await pool.query(query, [tutorId]);
        const tutorDetails = tutorResult.rows[0];
        // JS WORKS HERE    
        res.send(tutorDetails);
      } catch (err) {
        console.log('ERROR: Get tutor details', err);
        res.sendStatus(500);
      }
    });
 

module.exports = router;