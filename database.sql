-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
DROP TABLE "feedback_tutors";
DROP TABLE "session";
DROP TABLE "student";
DROP TABLE "tutor";
DROP TABLE "user";
DROP TABLE "subject";


CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "full_name" VARCHAR (120) NOT NULL,
    "is_student" BOOLEAN NOT NULL
);

CREATE TABLE "student" (
  "id" SERIAL PRIMARY KEY,
  "img" VARCHAR(1000),
  "name" VARCHAR(120) NOT NULL,
  "parent_name" VARCHAR(120) NOT NULL,
  "parent_email" VARCHAR(120) NOT NULL,
  "parent_number" VARCHAR NOT NULL,
  "comments" VARCHAR(1000),
  "user_id" INT REFERENCES "user"
);

CREATE TABLE "tutor" (
  "id" SERIAL PRIMARY KEY,
  "img" VARCHAR(1000),
  "full_name" VARCHAR(120) NOT NULL,
  "grades_taught" VARCHAR(120) NOT NULL,
  "about" VARCHAR(1000) NOT NULL,
  "user_id" INT REFERENCES "user"
);

CREATE TABLE "feedback_tutors" (
  "id" SERIAL PRIMARY KEY,
  "description" VARCHAR(1000) NOT NULL,
  "student_id" INT REFERENCES "student",
  "tutor_id" INT REFERENCES "tutor"
);

CREATE TABLE "subject" (
  "id" SERIAL PRIMARY KEY,
  "subject_name" VARCHAR(120) NOT NULL
);

CREATE TABLE "session" (
  "id" SERIAL PRIMARY KEY,
  "date" DATE NOT NULL,
  "time" TIME NOT NULL,
  "duration" INT NOT NULL,
  "student_id" INT REFERENCES "student",
  "tutor_id" INT REFERENCES "tutor",
  "subject_id" INT REFERENCES "subject"
);


