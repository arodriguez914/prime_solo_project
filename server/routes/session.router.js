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
router.get('/upcoming', rejectUnauthenticated, (req, res) => {
    // console.log('GET /api/session/upcoming');
    pool
      .query(`SELECT session.*, "user"."full_name", "tutor"."full_name", "subject"."subject_name" FROM "session"
      JOIN "user" ON "session"."student_id" = "user"."id"
      JOIN "tutor" ON "session"."tutor_id" = "tutor"."id"
      JOIN "subject" ON "session"."subject_id" = "subject"."id"
      WHERE "start_datetime" > CURRENT_TIMESTAMP AND "user"."id" = $1
      ORDER BY "session"."start_datetime";`, [req.user.id])
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
      .query(`SELECT session.*, "user"."full_name", "tutor"."full_name", "subject"."subject_name" FROM "session"
      JOIN "user" ON "session"."student_id" = "user"."id"
      JOIN "tutor" ON "session"."tutor_id" = "tutor"."id"
      JOIN "subject" ON "session"."subject_id" = "subject"."id"
      WHERE "start_datetime" < CURRENT_TIMESTAMP AND "user"."id" = $1
      ORDER BY "session"."start_datetime";`, [req.user.id])
      .then((result) => {
        res.send(result.rows);
        console.log('Past GET is:', result.rows); 
      })
      .catch((error) => {
        console.log('Error GET /api/session', error);
        res.sendStatus(500);
      });
  });
/**
 * POST route template 
 */
router.post('/schedule', rejectUnauthenticated, (req, res) => {
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

router.put('/edit/:id', rejectUnauthenticated, (req, res) => {
    const {startDate, endDate, subject, tutor, student} = req.body;
    const sessionId = req.params.id;
  
    const dbQuery = `UPDATE "session"
    SET "student_id" = $1, "tutor_id" = $2, "subject_id" = $3
    WHERE "id" = $4;`;
    
    pool
      .query(dbQuery, [student, tutor, subject, sessionId])
      .then((result) => {
        res.sendStatus(200);
      })
      .catch((error) => {
        console.error('Error updating session: ', error);
        res.sendStatus(500);
      });
  });

router.delete('/delete/:id', rejectUnauthenticated, (req, res) => {
    const sessionId = req.params.id;
    console.log('req.params', req.params);
    console.log('sessionId:', sessionId);
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