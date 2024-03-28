import React, { useState } from "react";
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
  const [about, setAbout] = useState("");
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

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

        <h2 form className="updateFormPanel">
          Update Profile Page
        </h2>
        <div>
          <label htmlFor="name">
            Your Full Name:
            <input type="name" name="name" placeholder={user.full_name} required onChange={(event) => {
            setName(event.target.value);
          }}/>
          </label>
        </div>
       
        <div>
            <label htmlFor="parentName">
              Parent's Name:
              <input
                type="parentName"
                name="parentName"
                placeholder={user.parentName}
                required
                onChange={(event) => setParentName(event.target.value)}
              />
            </label>
          </div>
          {/* <div>
            <label htmlFor="parentEmail">
              Parent's Email Address:
              <input
                type="parentEmail"
                name="parentEmail"
                 // placeholder={user.parentEmail}
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
                // placeholder={user.parentPhone}
                required
                onChange={(event) => setParentPhone(event.target.value)}
              />
            </label>
          </div>
          <div>
            <label htmlFor="parentPhone">
              Parent's Phone Number:
              <input
                type="parentPhone"
                name="parentPhone"
                // placeholder={user.comments}
                required
                onChange={(event) => setParentPhone(event.target.value)}
              />
            </label>
          </div>
          <div>
            <label htmlFor="comments">  
            Comments/Additional Informational for Tutor
              <input
                type="comments"
                name="comments"
                // placeholder={user.gradesTaught}
                required
                onChange={(event) => setComments(event.target.value)}
              />
            </label>
          </div>
          
          <div>
            <label htmlFor="gradesTaught">  
            Grades Taught
              <input
                type="gradesTaught"
                name="gradesTaught"
                // placeholder={user.gradesTaught}
                required
                onChange={(event) => setGradesTaught(event.target.value)}
              />
            </label>
          </div>
          <div>
            <label htmlFor="about">
              About You
              <input
                type="about"
                name="about"
                // placeholder={user.about}
                required
                onChange={(event) => setAbout(event.target.value)}
              />
            </label>
          </div>  */}

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
