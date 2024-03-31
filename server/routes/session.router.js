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
    const {date, time, duration, subject, tutorName, full_name, user, tutor} = req.body;
    const queryText = `INSERT INTO "session" ("date", "time", "duration, student_id, tutor_id")
        VALUES ($1, $2, $3, $4, $5) RETURNING id;`;
    
    pool.query(queryText, [date, time, duration, user.id, tutor.id])
    .then((response) => {
      console.log('Response 1:', response);
    })
          .catch((err) => {
            console.log('Session creation failed: ', err);
            res.sendStatus(500);
    })
  })

// pool.query(queryText, [date, time, duration])
// .then((response) => {
//   console.log('Response 1:', response);
//     pool.query(queryTutor, [tutorName])
//     .then((response) => {
//       console.log('Response 2:', response);
//       pool.query(queryuser, [full_name])
//       .then((response) => {res.sendStatus(201);})})}).catch(res.sendStatus(500))
//           .catch((err) => {
//         console.log('Session creation failed: ', err);
//         res.sendStatus(500);
//   })
//   })



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