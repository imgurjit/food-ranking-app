import { userConstants } from "../constants";

const userState = {
  username: undefined,
  isAuthenticated: false
};

export function userReducer(state = userState, action) {
  switch (action.type) {
    case userConstants.LOGIN_SUCCESSFUL:
      return {
        ...state,
        username: action.data.username,
        isAuthenticated: true
      };

    case userConstants.LOGIN_FAILURE:
      return {
        ...state,
        username: undefined,
        isAuthenticated: false
      };

    default:
      return state;
  }
}
