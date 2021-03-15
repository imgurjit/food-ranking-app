import { userConstants } from "../constants";

const userState = {
  username: undefined,
  isAuthenticated: false,
  favouriteDishes: [],
  showSnackbar: false,
  snackBarMessage: undefined,
};

export function userReducer(state = userState, action) {
  switch (action.type) {
    case userConstants.LOGIN_SUCCESSFUL:
      return {
        ...state,
        username: action.data.username,
        isAuthenticated: true,
      };

    case userConstants.LOGIN_FAILURE:
      return {
        ...state,
        username: undefined,
        isAuthenticated: false,
      };

    case userConstants.LOGOUT:
      return {
        ...state,
        username: undefined,
        isAuthenticated: false,
        favouriteDishes: [],
      };

    case userConstants.ADD_TO_FAVOURITES:
      return {
        ...state,
        favouriteDishes: state.favouriteDishes.concat(action.id),
      };

    case userConstants.REMOVE_FROM_FAVOURITES:
      return {
        ...state,
        favouriteDishes: state.favouriteDishes.filter((item) => item !== action.id),
      };

    case userConstants.UPDATE_FAVOURITES:
      return {
        ...state,
        favouriteDishes: [
          ...array_move(
            state.favouriteDishes,
            action.data.oldPreferenceNumber,
            action.data.preferenceNumber
          ),
        ],
      };

    case userConstants.SHOW_SNACKBAR:
      return {
        ...state,
        showSnackbar: true,
        snackBarMessage: action.message,
      };

    case userConstants.CLOSE_SNACKBAR:
      return {
        ...state,
        showSnackbar: false,
        snackBarMessage: undefined,
      };

    default:
      return state;
  }
}

function array_move(arr, old_index, new_index) {
  if (new_index >= arr.length) {
    var k = new_index - arr.length + 1;
    while (k--) {
      arr.push(undefined);
    }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return arr; // for testing
}
