import React from "react";
import { submitUsernameFetch } from "../logic/services";
import feedback from "../logic/feedback";
import { checkUsernameSintax } from "../logic/sintaxChecks";

const Login = ({ setUserState, setMessage }) => {
  const submitLogin = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const isUsernameSintaxValid = checkUsernameSintax(username, setMessage);
    if (!isUsernameSintaxValid) {
      setUsernameRulesVisibility(true);
      return;
    }
    setUsernameRulesVisibility(false);

    submitUsernameFetch(username)
      .then((dataObject) => {
        setUserState({
          username: dataObject.username,
          isLoggedIn: true,
        });
      })
      .catch((error) => {
        setMessage(feedback[error.message]);
        setUserState({ isLoggedIn: false });
      });
  };

  const setUsernameRulesVisibility = (shouldBeVisible) => {
    const usernameRulesElement = document.getElementById("username-rules");
    if (shouldBeVisible && usernameRulesElement.classList.contains("hidden")) {
      usernameRulesElement.classList.remove("hidden");
    }
    if (
      !shouldBeVisible &&
      !usernameRulesElement.classList.contains("hidden")
    ) {
      usernameRulesElement.classList.add("hidden");
    }
  };

  return (
    <div>
      <div className="login-body">
        <div className="login-title">LOGIN</div>
        <form id="login-form" onSubmit={submitLogin}>
          <label htmlFor="username-input" className="username-label">
            USERNAME:
          </label>

          <input
            type="text"
            id="username-input"
            name="username"
            placeholder="Enter username here ..."
          />
        </form>
        <input
          type="submit"
          className="login-submit-button"
          value="SUBMIT"
          form="login-form"
        />
        <div id="username-rules" className="username-rules hidden">
          Take into account that username:
          <ul>
            <li>should be between 2 and 20 characters long</li>
            <li>is case sensitive</li>
            <li>should contain alphanumeric characters only</li>
            <li>should neither be empty nor contain spaces</li>
            <li>should not be the word "dog"</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Login;
