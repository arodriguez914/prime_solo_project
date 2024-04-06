const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const {
  rejectUnauthenticated,
  // eslint-disable-next-line no-undef
} = require('../modules/authentication-middleware');

/**
 * GET route template set up by id
 */
router.get('/scheduled', rejectUnauthenticated, (req, res) => {
    // console.log('GET /api/session');
    pool
      .query(`SELECT *, "student"."name", "tutor"."full_name", "subject"."subject_name" FROM "session"
      JOIN "student" ON "session"."student_id" = "student"."id"
      JOIN "tutor" ON "session"."student_id" = "tutor"."id"
      JOIN "subject" ON "session"."subject_id" = "subject"."id"
      WHERE "start_datetime" >= CURRENT_TIMESTAMP
      ORDER BY "session"."start_datetime";`)
      .then((result) => {
        res.send(result.rows);
      })
      .catch((error) => {
        console.log('Error GET /api/session', error);
        res.sendStatus(500);
      });
  });

  router.get('/past', rejectUnauthenticated, (req, res) => {
    // console.log('GET /api/session');
    pool
      .query(`SELECT *, "student"."name", "tutor"."full_name", "subject"."subject_name" FROM "session"
      JOIN "student" ON "session"."student_id" = "student"."id"
      JOIN "tutor" ON "session"."tutor_id" = "tutor"."id"
      JOIN "subject" ON "session"."subject_id" = "subject"."id"
      WHERE "start_datetime" < CURRENT_TIMESTAMP
      ORDER BY "session"."start_datetime;`)
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
  console.log(req.body);
    const {startDate, endDate, subject, tutor, student} = req.body;
    const queryText = `INSERT INTO "session" ("student_id", "tutor_id", "subject_id", "start_datetime", "end_datetime")
        VALUES ($1, $2, $3, $4, $5) RETURNING id;`;
    
    pool.query(queryText, [student, tutor, subject, startDate, endDate])
    .then((response) => {
      console.log('Response 1:', response);
      res.sendStatus(200);
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