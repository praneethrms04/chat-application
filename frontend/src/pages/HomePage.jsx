import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { userLogin, userSignup } from "../api/auth.js";

import Login from "../components/login/Login.jsx";
import Signup from "../components/signup/Signup.jsx";

const HomePage = () => {
  const [showSignup, setShowSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
    setLoading(true);
    userLogin(data)
      .then((res) => {
        const { data, status } = res;
        if (status === 200) {
          setLoading(false);
          toast.success("Login success...!", {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
  

          });
          localStorage.setItem("userInfo", JSON.stringify(data));
          // localStorage.setItem("name", data.name);
        
        }
        setTimeout(() => {
          navigate("/chat");
        }, 2000);
      })
      .catch((error) =>
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        })
      );
  };

  /// ---  if the user is login push to chatpage --- ///

  // useEffect(()=>{
  //   const userInfo =  JSON.parse(localStorage.getItem("userInfo"))
  //   if(userInfo){
  //     navigate("/chat")
  //   }
  // },[navigate])

  return (
    <>
      {showSignup ? (
        <Signup gotoLogin={gotoLogin} onSignupSubmit={signupSubmitHandler} loading={loading} />
      ) : (
        <Login
          gotoSignup={gotoSignup}
          onSubmitHandler={loginSubmitHandler}
          loading={loading}
        />
      )}
    </>
  );
};

export default HomePage;
