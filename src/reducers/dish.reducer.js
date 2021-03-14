import { dishesConstants } from "../constants";

const dishState = {
  dishes: []
};

export function dishReducer(state = dishState, action) {
  console.log("Action --> ", action, state);
  switch (action.type) {
    case dishesConstants.GET_DISHES:
      return {
        ...state,
        dishes: action.res
      };

    case dishesConstants.ADD_DISH:
      return {
        ...state,
        dishes: state.dishes.concat(action.data)
      };

    default:
      return state;
  }
}
