import * as React from 'react';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Radio Button MUI
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { styled } from '@mui/material/styles';

const BpIcon = styled('span')(({ theme }) => ({
  borderRadius: '50%',
  width: 16,
  height: 16,
  boxShadow:
    theme.palette.mode === 'dark'
      ? '0 0 0 1px rgb(16 22 26 / 40%)'
      : 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
  backgroundColor: theme.palette.mode === 'dark' ? '#394b59' : '#f5f8fa',
  backgroundImage:
    theme.palette.mode === 'dark'
      ? 'linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))'
      : 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
  '.Mui-focusVisible &': {
    outline: '2px auto rgba(19,124,189,.6)',
    outlineOffset: 2,
  },
  'input:hover ~ &': {
    backgroundColor: theme.palette.mode === 'dark' ? '#30404d' : '#ebf1f5',
  },
  'input:disabled ~ &': {
    boxShadow: 'none',
    background:
      theme.palette.mode === 'dark' ? 'rgba(57,75,89,.5)' : 'rgba(206,217,224,.5)',
  },
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: '#137cbd',
  backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
  '&::before': {
    display: 'block',
    width: 16,
    height: 16,
    backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
    content: '""',
  },
  'input:hover ~ &': {
    backgroundColor: '#106ba3',
  },
});

function BpRadio(props) {
  return (
    <Radio
      disableRipple
      color="default"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      {...props}
    />
  );
}


function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isStudent, setIsStudent] = useState(true);
  const [parentName, setParentName] = useState("");
  const [parentEmail, setParentEmail] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const [gradesTaught, setGradesTaught] = useState("");
  const [about, setAbout] = useState("");
  const [selectedValue, setSelectedValue] = React.useState('a');
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

      <FormControl>
        <FormLabel id="demo-controlled-radio-buttons-group"></FormLabel>
        Please Select Your Role
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={isStudent}
        >
          <FormControlLabel
            required
            value="yes"
            control={<BpRadio />}
            label="Student"
            onClick={(event) => setIsStudent(true)}
          />
          <FormControlLabel
            required
            value="no"
            control={<BpRadio />}
            label="Tutor"
            onClick={(event) => setIsStudent(false)}
          />
        </RadioGroup>
      </FormControl>
      {isStudent ? (
        <div>
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
        </div>
      ) : (
        <div>
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
          <div></div>
        </div>
      )}
      <input className="btn" type="submit" name="submit" value="Register" />
    </form>
  );
}

export default RegisterForm;
