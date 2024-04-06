const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    console.log('GET /api/student');
    pool
      .query('SELECT * from "student";')
      .then((result) => {
        res.send(result.rows);
      })
      .catch((error) => {
        console.log('Error GET /api/student', error);
        res.sendStatus(500);
      });
  });

 

  module.exports = router;