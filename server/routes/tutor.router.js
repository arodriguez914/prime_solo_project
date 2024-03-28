const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    const query = `
    SELECT "img", "full_name", "grades_taught", "about" FROM "tutor"
    ORDER BY "full_name";`;
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
  
 

module.exports = router;