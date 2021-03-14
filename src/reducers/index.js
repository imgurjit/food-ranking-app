import { combineReducers } from "redux";
import { userReducer } from "./user.reducer";
import { dishReducer } from "./dish.reducer";

const rootReducer = combineReducers({
  userReducer,
  dishReducer
});

export default rootReducer;
