import React, { useState } from "react";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import Login from "../components/login/Login.jsx";
import Signup from "../components/signup/Signup.jsx";
import { userLogin, userSignup } from "../api/auth.js";

const HomePage = () => {
  const navigate = useNavigate();
  const [showSignup, setShowSignup] = useState(false);

  const gotoLogin = () => {
    setShowSignup(false);
  };

  const gotoSignup = () => {
    setShowSignup(true);
  };

  /// ---- Registration ---///

  const signupSubmitHandler = (data) => {
    userSignup(data)
      .then((res) => {
        const { status } = res;
        if (status === 201) {
          setShowSignup(false);
          toast.success("Registration success...!", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
        // localStorage.setItem("userInfo", JSON.stringify(data))
      })
      .catch((error) =>
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        })
      );
  };

  /// --- Login --- ///

  const loginSubmitHandler = (data) => {
    userLogin(data)
      .then((res) => {
        const { data, status } = res;
        if (status === 200) {
          toast.success("Login success...!", {
            position: toast.POSITION.TOP_CENTER,
          });

          localStorage.setItem("name", data.name);
          localStorage.setItem("email", data.email);
          localStorage.setItem("token", data.token);
        }
        navigate("/chats");
      })
      .catch((error) =>
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        })
      );
  };

  return (
    <>
      {showSignup ? (
        <Signup gotoLogin={gotoLogin} onSignupSubmit={signupSubmitHandler} />
      ) : (
        <Login gotoSignup={gotoSignup} onSubmitHandler={loginSubmitHandler} />
      )}
    </>
  );
};

export default HomePage;
