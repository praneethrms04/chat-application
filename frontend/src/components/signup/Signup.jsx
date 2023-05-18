import React from "react";
import "./signup.css";
const Signup = (props) => {
  const { gotoLogin } = props;
  return (
    <div className="signup">
      <div className="form-body">
        <p className="text">Signup</p>
        <form action="">
          <div>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button className="submit">Signup</button>
          </div>
          <p className="account">
            You have an account{" "}
            <span className="span" onClick={gotoLogin}>
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
