import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

function UpdateProfilePage() {
  const [comments, setComments] = useState("");
  const [img, setImg] = useState("");
  const [name, setName] = useState("");
  const [parentName, setParentName] = useState("");
  const [isStudent, setIsStudent] = useState(true);
  const [parentEmail, setParentEmail] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const [gradesTaught, setGradesTaught] = useState("");
  const students = useSelector((store) => store.students);
  const tutors = useSelector((store) => store.tutors);
  const [about, setAbout] = useState("");
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCH_TUTORS" });
    dispatch({ type: "FETCH_STUDENTS" });
  }, []);
  
  if (user.is_student === true) {
  useEffect(() => {
    if (user.id && students.length > 0) {
      const matchedStudent = students.filter((studentItem) => {
        return studentItem.user_id === user.id;
      });
      setName(matchedStudent[0].name)
      setParentName(matchedStudent[0].parent_name);
      setParentEmail(matchedStudent[0].parent_email);
      setParentPhone(matchedStudent[0].parent_number);
      setComments(matchedStudent[0].comments);
    }
  }, [students, user]);
} else {
  console.log('in use' );
   useEffect(() => {
      if (user.id && tutors.length > 0) {
        const matchedTutor = tutors.filter((tutorItem) => {
          return tutorItem.user_id === user.id;
        });
        setName(matchedTutor[0].full_name)
        setGradesTaught(matchedTutor[0].grades_taught);
        setAbout(matchedTutor[0].about);
      }
    }, [tutors, user]);}

  const updateUser = (event) => {
    event.preventDefault();

    dispatch({
      type: "UPDATE",
      payload: {
        id: user.id,
        img: img,
        full_name: name,
        parentName: parentName,
        parentEmail: parentEmail,
        parentPhone: parentPhone,
        comments: comments,
        gradesTaught: gradesTaught,
        about: about,
      },
    });
  }; // end updateUser

  return (
    <form className="updateFormPanel" onSubmit={updateUser}>
      <div>
        <h2>
          <u>Update Profile </u>
        </h2>
        {/* <div>
          <label htmlFor="name">
            Your Full Name:
            <input
              type="name"
              name="name"
              value={tutors.full_name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </label>
        </div> */}
        {user.is_student ? (
          <>
          <div>
          <label htmlFor="name">
            Your Full Name:
            <input
              type="name"
              name="name"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </label>
        </div>
            <div>
              <label htmlFor="parentName">
                Parent's Name:
                <input
                  type="parentName"
                  name="parentName"
                  value={parentName}
                  required
                  onChange={(event) => setParentName(event.target.value)}
                />
              </label>
            </div>
            <div>
              <label htmlFor="parentEmail">
                Parent's Email Address:
                <input
                  type="parentEmail"
                  name="parentEmail"
                  value={parentEmail}
                  required
                  onChange={(event) => setParentEmail(event.target.value)}
                />
              </label>
            </div>
            <div>
              <label htmlFor="parentPhone">
                Parent's Phone Number:
                <input
                  type="parentPhone"
                  name="parentPhone"
                  value={parentPhone}
                  required
                  onChange={(event) => setParentPhone(event.target.value)}
                />
              </label>
            </div>
            <div>
              <label htmlFor="comments">
                Comments/Additional Informational for Tutor
                <input
                  className="commentBox"
                  type="comments"
                  name="comments"
                  required
                  onChange={(event) => setComments(event.target.value)}
                />
              </label>
            </div>
          </>
        ) : (
          <>
          <div>
          <label htmlFor="name">
            Your Full Name:
            <input
              type="name"
              name="name"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </label>
        </div>
            <div>
              <label htmlFor="gradesTaught">
                Grades Taught
                <input
                  type="gradesTaught"
                  name="gradesTaught"
                  value={gradesTaught}
                  required
                  onChange={(event) => setGradesTaught(event.target.value)}
                />
              </label>
            </div>
            <div>
              <label htmlFor="about">
                About You
                <input 
                  className="commentBox"
                  type="about"
                  name="about"
                  value={about}
                  required
                  onChange={(event) => setAbout(event.target.value)}
                />
              </label>
            </div>
          </>
        )}
        <input
          className="btn"
          type="submit"
          name="submit"
          value="Update Profile"
        />
      </div>
    </form>
  );
}

export default UpdateProfilePage;
