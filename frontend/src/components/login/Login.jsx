import React, { useState } from "react";
import open from "../../assets/open.svg";
import close from "../../assets/close.svg";

import "./login.css";

const Login = (props) => {
  const { gotoSignup, onSubmitHandler } = props;
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    const data = { email, password };
    onSubmitHandler(data);
  };

  return (
    <div className="login">
      <div className="form-body-login">
        <p className="text-login">Login</p>
        <form onSubmit={submitHandler}>
          <div>
            <input
              type="email"
              placeholder="Email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="input-field">
              <input
                type={show ? "text" : "password"}
                placeholder="Password"
                className="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <img
                src={show ? close : open}
                className="show-btn"
                alt="open"
                onClick={() => setShow(!show)}
              />
            </div>
            <input type="submit" className="submit" value="Login" />
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
