import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChatState } from "../../context/ChatProvider";
import { notification } from "../../assets";
import UserModel from "../usermodel/UserModel";
import "./navbar.css";
import SearchUserModel from "../searchusermodel/SearchUserModel";
import { fetchUser } from "../../api/user";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, setLoading } = ChatState();
  // console.log(user);
  const [showModel, setShowModel] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [showSearchUserModel, setShowSearchUserModel] = useState(false);

  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.clear();
    navigate("/");
  };

  const searchHandler = (search) => {
    if(!search){
      toast.warning("Please Enter name...!", {
        autoClose: 3000,
        position: toast.POSITION.TOP_CENTER,
      });
    }
    setLoading(true);
    fetchUser(search)
      .then((res) => {
        const { status, data } = res;
        if (status === 200) {
          setLoading(false);
          setSearchResult(data);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="horz-navbar">
        <div className="search-bar">
          {/* <SearchUserModel /> */}
          <input type="text" name="" id="" />{" "}
          <button onClick={() => setShowSearchUserModel(true)}>Search</button>
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
      {showSearchUserModel && (
        <SearchUserModel
          setShowSearchUserModel={setShowSearchUserModel}
          searchHandler={searchHandler}
          searchResult={searchResult}
        />
      )}
    </>
  );
};

export default Navbar;
