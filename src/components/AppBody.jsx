import React from "react";
import Login from "./Login";
import Content from "./Content";

const AppBody = ({ userState, setUserState, setMessage, logout }) => {
  return (
    <div className="app-body">
      {userState.isLoggedIn ? (
        <Content
          setMessage={setMessage}
          logout={logout}
          username={userState.username}
        />
      ) : (
        <Login setUserState={setUserState} setMessage={setMessage} />
      )}
    </div>
  );
};

export default AppBody;
