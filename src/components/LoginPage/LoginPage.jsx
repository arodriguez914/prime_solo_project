import React from "react";
import LoginForm from "../LoginForm/LoginForm";
import tutor from "../../../public/tutor.jpg";
import { useHistory } from "react-router-dom";

import { Box } from "@mui/material";

function LoginPage() {
  const history = useHistory();

  return (
    <div className="loginBackground">

      
      <Box
        class="tutor"
        style={{
          backgroundImage: `url(${tutor})`,
          backgroundSize: "cover",
          height: "100vh",
          color: "#f5f5f5",
        }}
      ><LoginForm /></Box>

      <center>
        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push("/registration");
          }}
        >
          New User? Register here!
        </button>
      </center>
    </div>
  );
}

export default LoginPage;
