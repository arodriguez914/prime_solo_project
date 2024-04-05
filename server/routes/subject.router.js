const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    console.log('GET /api/subject');
    pool
      .query('SELECT * from "subject";')
      .then((result) => {
        res.send(result.rows);
      })
      .catch((error) => {
        console.log('Error GET /api/subject', error);
        res.sendStatus(500);
      });
  });

  module.exports = router;