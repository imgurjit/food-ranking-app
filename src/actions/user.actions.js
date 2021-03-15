import { userConstants } from "../constants";
import { userService } from "../services";

export const userActions = {
  login,
  logout,
  loginSuccessful,
  addToFavouriteDishes,
  removeFromFavouriteDishes,
  updateFavouriteDishes,
  triggerSnackbar,
  closeSnackBar,
};

function loginSuccessful() {
  let data = {
    username: sessionStorage.getItem("username"),
  };
  return { type: userConstants.LOGIN_SUCCESSFUL, data };
}

function login(username, password, success, failure) {
  return (dispatch) => {
    userService.login(
      username,
      password,
      (res) => {
        let data = {
          username: username,
        };
        sessionStorage.setItem("isAuthenticated", "true");
        sessionStorage.setItem("username", username);
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

function logout(success, failure) {
  return (dispatch) => {
    userService.logout(
      (res) => {
        if (
          sessionStorage.getItem("isAuthenticated") !== null &&
          sessionStorage.getItem("username") !== null
        ) {
          try {
            sessionStorage.removeItem("isAuthenticated");
            sessionStorage.removeItem("username");
          } catch (e) {}
        }
        success();
        dispatch({ type: userConstants.LOGOUT });
      },
      (err) => {
        failure();
        dispatch({ type: userConstants.LOGOUT });
      }
    );
  };
}

function addToFavouriteDishes(id) {
  return (dispatch) => {
    dispatch({ type: userConstants.ADD_TO_FAVOURITES, id });
  };
}

function removeFromFavouriteDishes(id) {
  return (dispatch) => {
    dispatch({ type: userConstants.REMOVE_FROM_FAVOURITES, id });
  };
}

function updateFavouriteDishes(oldPreferenceNumber, preferenceNumber) {
  return (dispatch) => {
    let data = {
      oldPreferenceNumber: oldPreferenceNumber,
      preferenceNumber: preferenceNumber,
    };
    dispatch({ type: userConstants.UPDATE_FAVOURITES, data });
  };
}

function triggerSnackbar(message) {
  return (dispatch) => {
    dispatch({ type: userConstants.SHOW_SNACKBAR, message });
  };
}

function closeSnackBar() {
  return (dispatch) => {
    dispatch({ type: userConstants.CLOSE_SNACKBAR });
  };
}
