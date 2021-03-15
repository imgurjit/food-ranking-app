import { dishesConstants } from "../constants";
import { dishService } from "../services";

export const dishActions = {
  addDish,
  deleteDish,
  updateDishPoints,
};

function addDish(dishName, dishDesc, image, submittedBy, success, failure) {
  return (dispatch) => {
    dishService.addDish(
      dishName,
      dishDesc,
      image,
      submittedBy,
      (res) => {
        success(res);
        let data = res["dish"];
        dispatch({ type: dishesConstants.ADD_DISH, data });
      },
      (err) => {
        failure(err);
      }
    );
  };
}

function updateDishPoints(allDishes, dishes, success, failure) {
  return (dispatch) => {
    dishService.updateDishPoints(
      allDishes,
      dishes,
      (res) => {
        success(res);
        dispatch({ type: dishesConstants.UPDATE_POINTS, res });
      },
      (err) => {
        failure(err);
      }
    );
  };
}

function deleteDish(id, success, failure) {
  return (dispatch) => {
    dispatch({ type: dishesConstants.DELETE_DISH, id });
    success();
  };
}
