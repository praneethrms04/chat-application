import "./mychat.css";

const MyChat = () => {
  const users = ["User 1","user3", "User 2", "User 3", "User 4","User 1", "User 2", "User 3", "User 4","User 1", "User 2", "User 3", "User 4"];

  return (
    <>
      <div className="sidebar-container">
        <div className="sidebar-header">Users</div>
        <div className="sidebar-users">
          {users.map((user, index) => (
            <div className="user" key={index}>
              {user}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MyChat;
