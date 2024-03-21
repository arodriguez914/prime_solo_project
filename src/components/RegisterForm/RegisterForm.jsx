import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isStudent, setIsStudent] = useState(true);
  const [parentName, setParentName] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [gradesTaught, setGradesTaught] = useState('');
  const [about, setAbout] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: "REGISTER",
      payload: {
        username: username,
        password: password,
        full_name: name,
        is_student: isStudent,
        parentName: parentName,
        parentEmail: parentEmail,
        parentPhone: parentPhone,
        gradesTaught: gradesTaught,
        about: about,
      },
    });
  }; // end registerUser

  return (
    <form className="formPanel" onSubmit={registerUser}>
      <h2>Register User</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div>
        <label htmlFor="username">
          Username:
          <input
            type="text"
            name="username"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="name">
          Your Full Name:
          <input
            type="name"
            name="name"
            value={name}
            required
            onChange={(event) => setName(event.target.value)}
          />
        </label>
      </div>

      <div>
        <label htmlFor="isStudent">
          Are you A Student?
          <button
            type="button"
            name="isStudent"
            required
            onClick={(event) => setIsStudent(true)}
          >
            Yes
          </button>
          {/* <div> change buttons to radio inputs */}
          <button
            type="button"
            name="isTutor"
            required
            onClick={(event) => setIsStudent(false)}
          >
            No
          </button>
        </label>
      </div>
      {isStudent ? <div>
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
      
      </div> : <div>

      <div>
        <label htmlFor="gradesTaught">
          Grades Qualified
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
            type="about"
            name="about"
            value={about}
            required
            onChange={(event) => setAbout(event.target.value)}
          />
        </label>
      </div> 
      <div>
      </div>
      </div>
}
    <input className="btn" type="submit" name="submit" value="Register" />  
    </form>
  );
}

export default RegisterForm;
