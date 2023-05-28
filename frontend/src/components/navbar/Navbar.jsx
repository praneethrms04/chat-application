import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChatState } from "../../context/ChatProvider";
import { notification } from "../../assets";
import UserModel from "../usermodel/UserModel";
import "./navbar.css";

const Navbar = () => {
  const { user } = ChatState();
  console.log(user);
  const [showModel, setShowModel] = useState(false);
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <div className="horz-navbar">
        <div className="search-bar">
          <input type="text" name="" id="" onClick={() => setShowModel(true)} />
        </div>
        <div className="title">Whatsapp</div>
        <div className="profile">
          <img src={notification} alt="notification" width={25} />
          <img
            src={user.picture}
            alt={user.pictgure}
            className="profile-pic"
            onClick={() => setShowModel(true)}
          />
          <button onClick={logoutHandler}>Logout</button>
        </div>
      </div>
      {showModel && <UserModel setShowModel={setShowModel} />}
    </>
  );
};

export default Navbar;
