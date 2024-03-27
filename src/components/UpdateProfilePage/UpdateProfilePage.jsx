import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function UpdateProfilePage() {
  const [comments, setComments] = useState("");
  const [img, setImg] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isStudent, setIsStudent] = useState(true);
  const [parentName, setParentName] = useState("");
  const [parentEmail, setParentEmail] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const [gradesTaught, setGradesTaught] = useState("");
  const [about, setAbout] = useState("");
  const errors = useSelector((store) => store.errors);
  const profile = useSelector((store) => store.profile);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const updateUser = (event) => {
    event.preventDefault();

    dispatch({
      type: "UPDATE",
      payload: {
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
