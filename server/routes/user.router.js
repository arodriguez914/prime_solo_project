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

  const query = `
    SELECT * FROM "user"
      WHERE "id" = $1;
  `;
  const userId = req.params.id;

  const queryStudents = `
    SELECT "user"."id", "user"."full_name", "student"."user_id" FROM "user"
    JOIN "student" ON "user".id = "student"."user_id"
    WHERE "student"."student.user_id" = $1;
  `;

 
});
// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const { full_name, is_student, parentName, parentEmail, parentPhone, gradesTaught, about, user_id} = req.body
  console.log(req.body);

  const queryText = `INSERT INTO "user" ("username", "password", "full_name", "is_student")
    VALUES ($1, $2, $3, $4) RETURNING id`;

  const queryStudent = `INSERT INTO "student" ("name", "parent_name", "parent_email", "parent_number", "user_id")
    VALUES ($1, $2, $3, $4, $5) RETURNING id`;

  const queryTutor = `INSERT INTO "tutor" ("full_name", "grades_taught", "about", "user_id")
    VALUES ($1, $2, $3, $4) RETURNING id`;

  pool
    .query(queryText, [username, password, full_name, is_student])
        .then((response) => {
        console.log('Response 1:', response);
        const createdStudentId = response.rows[0].id; 
        is_student && (
        pool.query(queryStudent, [full_name, parentName, parentEmail, parentPhone, createdStudentId]).then((response) => {
        console.log('Response 2:', response)}).catch((e) => {res.sendStatus(500)}))
        
        const createdTutorId = response.rows[0].id; 
        !is_student && (
        pool.query(queryTutor, [full_name, gradesTaught, about, createdTutorId]).then((response) => {
          console.log('Response 3:', response)
        }).catch((e) => {
          console.log(e);
          res.sendStatus(500)
        }))     
        
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
  })
})

router.put('/update/:id', (req, res, next) => {
  const { id, img, full_name, is_student, parentName, parentEmail, parentPhone, gradesTaught, about, comments, user_id} = req.body
  let profileId = req.params.id;
  console.log('Params', profileId);
  console.log(req.body);

  const queryText = `UPDATE "user" 
    SET "full_name" = ($1) WHERE "id" = ($2);`;

  const queryStudent = `UPDATE "student" 
    SET "name" = ($1), "parent_name" = ($2), "parent_email" = ($3), "parent_number" = ($4), "comments" = ($5),  WHERE "user_id" = ($6);`;

  const queryTutor = `UPDATE "tutor" 
    SET "full_name" = ($1), "grades_taught" = ($2), "about" = ($3) WHERE "user_id" = ($4);`;

  pool
  .query(queryText,[full_name, profileId])
   .then((response) => {
      is_student && (
     pool.query(queryStudent, [full_name, parentName, parentEmail, parentPhone, comments, profileId]).then((response) => {
        console.log('Response 2:', response)
        res.send(200);
      })).catch((e) => {
        res.sendStatus(500)
      })
      !is_student && (
     pool.query(queryTutor, [full_name, gradesTaught, about, profileId]).then((response) => {
       console.log('Response 3:', response)
       res.sendStatus(200);
     })).catch((e) => {
       res.sendStatus(500)
     })        
  .catch((err) => {
    console.log('User update failed: ', err);
    res.sendStatus(500);
  })
})
})

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
