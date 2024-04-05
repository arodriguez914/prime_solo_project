const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// router.get('/', (req, res) => {
//     console.log('GET /api/student');
//     pool
//       .query('SELECT * from "student";')
//       .then((result) => {
//         res.send(result.rows);
//       })
//       .catch((error) => {
//         console.log('Error GET /api/student', error);
//         res.sendStatus(500);
//       });
//   });

  router.get('/:id', async (req, res) => {
    // ARRAY_AGG()
    const query = `
      SELECT * FROM "student"
        WHERE "id" = $1;
    `;
    const studentId = req.params.id;


    try {
        const studentResult = await pool.query(query, [studentId]);
        const studentDetails = studentResult.rows[0];
        // JS WORKS HERE    
        res.send(studentDetails);
      } catch (err) {
        console.log('ERROR: Get tutor details', err);
        res.sendStatus(500);
      }
    });
 

  module.exports = router;