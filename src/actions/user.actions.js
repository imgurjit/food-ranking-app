import { userConstants } from "../constants";
import { userService } from "../services";

export const userActions = {
  login,
  logout,
  loginSuccessful
};

function loginSuccessful() {
  let data = {
    agentname: sessionStorage.getItem("agentname"),
    domain: sessionStorage.getItem("domain"),
    token: sessionStorage.getItem("token")
  };
  return { type: userConstants.LOGIN_SUCCESSFUL, data };
}

function login(username, password, success, failure) {
  console.log(username, password);
  return (dispatch) => {
    userService.login(
      username,
      password,
      (res) => {
        let data = {
          username: username
        };
        sessionStorage.setItem("isAuthenticated", "true");
        sessionStorage.setItem("username", username);
        console.log("Res from userservice ", res);
        success(res);
        dispatch({ type: userConstants.LOGIN_SUCCESSFUL, data });
      },
      (err) => {
        dispatch({ type: userConstants.LOGIN_FAILURE });
        failure(err);
      }
    );
  };
}

function logout(url, agentname, token, success, failure) {
  return (dispatch) => {
    userService.logout(
      url,
      agentname,
      token,
      (res) => {
        if (
          sessionStorage.getItem("domain") !== null &&
          sessionStorage.getItem("token") !== null &&
          sessionStorage.getItem("isAuthenticated") !== null &&
          sessionStorage.getItem("agentname") !== null
        ) {
          try {
            //  sessionStorage.removeItem("domain");
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("isAuthenticated");
            sessionStorage.removeItem("agentname");
          } catch (e) {}
        }
        success();
        dispatch({ type: userConstants.LOGOUT_SUCCESSFUL });
      },
      (err) => {
        console.log("Err from generate token -> ", err);
        if (
          sessionStorage.getItem("domain") !== null &&
          sessionStorage.getItem("token") !== null &&
          sessionStorage.getItem("isAuthenticated") !== null &&
          sessionStorage.getItem("agentname") !== null
        ) {
          try {
            // sessionStorage.removeItem("domain");
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("isAuthenticated");
            sessionStorage.removeItem("agentname");
          } catch (e) {}
        }
        failure();
        dispatch({ type: userConstants.LOGOUT_SUCCESSFUL });
      }
    );
  };
}
