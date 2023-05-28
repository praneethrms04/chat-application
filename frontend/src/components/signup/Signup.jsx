import React, { useState } from "react";
import { toast } from "react-toastify";

import "./signup.css";
import { close, open } from "../../assets";

const Signup = (props) => {
  const { gotoLogin, onSignupSubmit } = props;

  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [picture, setPicture] = useState("");
  const [picLoading, setPicLoading] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    const data = { name, email, picture, password };
    onSignupSubmit(data);
  };

  const postDetails = (pics) => {
    setPicLoading(true);
    if (pics === undefined) {
      toast.warning("Please select an Image...!", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    if (
      pics.type === "image/jpeg" ||
      pics.type === "image/png" ||
      pics.type === "image/jpg"
    ) {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "dclwernzx");
      fetch("https://api.cloudinary.com/v1_1/dclwernzx/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data)
          setPicture(data.url.toString());
          // console.log(data.url.toString());
          setPicLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setPicLoading(false);
        });
    } else {
      toast.warning("Please select an Image...!", {
        position: toast.POSITION.TOP_CENTER,
      });
      setPicLoading(false);
      return;
    }
  };

  return (
    <div className="signup">
      <div className="form-body">
        <p className="text">Signup</p>
        <form onSubmit={submitHandler}>
          <div>
            <input
              type="text"
              placeholder="Name"
              className="input-field"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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

            <label
              className="select-pic"
              htmlFor={picture}
              ht="true"
              //  className="pictue"
            >
              Select picture
              <input
                type="file"
                required
                accept="image/*"
                className="file"
                onChange={(e) => postDetails(e.target.files[0])}
              />
            </label>

            <button
              type="submit"
              className="submit"
              
            >
              {picLoading ? "Loading...." : "Register"}
            </button>
          </div>
          <p className="account">
            You have an account
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
