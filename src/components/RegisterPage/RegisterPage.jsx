import React from 'react';

import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';
import passion from "../../../public/passion.jpg";

import {Box}  from '@mui/material';

function RegisterPage() {
  const history = useHistory();

  return (
    <div>

      <Box
        class="passion"
        style={{
          backgroundImage: `url(${passion})`,
          backgroundSize: "cover",
          height: "100vh",
          color: "#f5f5f5",
        }}
      ><RegisterForm /></Box>

      <center>
        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/login');
          }}
        >
          Already Registered? Login Here!
        </button>
      </center>
    </div>
  );
}

export default RegisterPage;
