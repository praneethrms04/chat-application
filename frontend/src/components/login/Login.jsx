import React from "react";

import "./login.css";
const Login = (props) => {
  const { gotoSignup } = props;
  return (
    <div className="login">
      <div className="form-body">
        <p className="text">Login</p>
        <form action="">
          <div>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button className="submit">Login</button>
          </div>
          <p className="account">
            You don't have an account
            <span className="span" onClick={gotoSignup}>
              Signup
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
