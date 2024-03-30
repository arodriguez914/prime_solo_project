const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template set up by id
 */
router.get('/', (req, res) => {
    console.log('GET /api/session');
    pool
      .query('SELECT * from "session";')
      .then((result) => {
        res.send(result.rows);
      })
      .catch((error) => {
        console.log('Error GET /api/session', error);
        res.sendStatus(500);
      });
  });
/**
 * POST route template 
 */
router.post('/schedule', (req, res) => {
    const {date, time, duration, subject, tutorName, full_name} = req.body;
    const queryText = `INSERT INTO "session" ("date", "time", "duration")
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;`;
    const queryTutor = `SELECT "tutor"."full_name" FROM "tutor";`;
    const queryuser = `SELECT "user"."full_name" FROM "user";`;
    
    pool.query(queryText, [date, time, duration, subject, tutorName, full_name])
        .then((result) => {
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log(`Error making query ${queryText}`, err);
            res.sendStatus(500);
        });
});

router.delete('/:id', (req, res) => {
    const sessionId = req.params.id;
    const queryText = `DELETE FROM "session" WHERE "id" = $1;`;
    pool
      .query(queryText, [sessionId])
      .then((response) => {
        res.sendStatus(200);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  });

module.exports = router;