import React, { useState } from "react";
import "./App.css";
import AppBody from "./components/AppBody";
import { logoutFetch } from "./logic/services";

function App() {
  const [userState, setUserState] = useState({ isLoggedIn: false });
  const [message, setMessage] = useState("");
  const logout = () => {
    // console.log("logout at app.js has been called");
    logoutFetch(userState.username)
      .then((message) => {
        setUserState({ isLoggedIn: false });
        setMessage(message);
      })
      .catch((error) => setMessage(error.message));
  };
  return (
    <div className="app" onChange={() => setMessage("")}>
      <h1>GROCERIES STOCK MONITOR APP</h1>
      <p
        className={
          userState.isLoggedIn
            ? "current-user-display"
            : "current-user-display hidden"
        }
      >
        <span>{`Logged In as: `}</span>
        <span>{userState.username}</span>
      </p>
      <p className="message">{message}</p>
      <AppBody
        userState={userState}
        setUserState={setUserState}
        setMessage={setMessage}
        logout={logout}
      />
    </div>
  );
}

export default App;
