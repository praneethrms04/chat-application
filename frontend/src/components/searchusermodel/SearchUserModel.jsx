import { useEffect, useState } from "react";
import Loader from "../loader/Loader";
import { cancel } from "../../assets";
import "./searchusermodel.css";
import { ChatState } from "../../context/ChatProvider";
import { fetchAllUsers } from "../../api/user";

const SearchUserModel = ({
  setShowSearchUserModel,
  searchHandler,
  searchResult,
}) => {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const [model, showModel] = useState(true);
  const { loading, setLoading } = ChatState();
  const fetchdata = (search) => {
    fetchAllUsers(search)
      .then((res) => {
        const { status, data } = res;
        if (status === 200) {
          setLoading(true);
          setResult(data);
        }
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchdata();
    // eslint-disable-next-line
  }, []);

  const handleSearchFunction = (e) => {
    e.preventDefault();
    showModel(false);
    searchHandler(search);
  };

  return (
    <>
      <div className="user-search-model">
        <img
          src={cancel}
          alt={cancel}
          className="user-search-close"
          onClick={() => setShowSearchUserModel(false)}
        />
        <div style={{ display: "flex", alignItems: "center" }}>
          <form onSubmit={handleSearchFunction}>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="search user here"
              className="seachuser-input"
            />
            <button className="seachuser-btn" type="submit">
              search
            </button>
          </form>
        </div>
        {model && (
          <div>
            {result.map((user, ind) => (
              <div
                key={ind}
                style={{
                  background: "#E8E8E8",
                  cursor: "pointer",
                  width: "100%",
                  height: "40px",
                  display: "flex",
                  marginTop: "10px",
                  alignItems: "center",
                  color: "black",
                  borderRadius: "20px",
                  boxShadow: "0 1px 3px 0px rgba(0, 0, 0, 0.12)",
                }}
              ></div>
            ))}
          </div>
        )}

        {loading ? (
          <Loader />
        ) : (
          <div>
            {searchResult.map((user, ind) => (
              <div
                key={ind}
                style={{
                  background: "#E8E8E8",
                  cursor: "pointer",
                  width: "100%",
                  height: "40px",
                  display: "flex",
                  marginTop: "10px",
                  alignItems: "center",
                  color: "black",
                  borderRadius: "20px",
                  boxShadow: "0 1px 3px 0px rgba(0, 0, 0, 0.12)",
                }}
              >
                <img
                  src={user.picture}
                  height="40px"
                  width="40px"
                  alt=""
                  style={{
                    marginRight: "10px",
                    borderColor: "black",
                    borderWidth: "1px",
                    borderRadius: "50%",
                  }}
                />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div style={{ textAlign: "center" }}>
                    <p>
                      <b>Name : </b>
                      {user.name}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchUserModel;
