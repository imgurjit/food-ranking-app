import { dishesConstants } from "../constants";
import { dishService } from "../services";

export const dishActions = {
  getDishes,
  addDish
};

function getDishes(success, failure) {
  return (dispatch) => {
    dishService.getDishes(
      (res) => {
        success(res);
        dispatch({ type: dishesConstants.GET_DISHES, res });
      },
      (err) => {
        failure(err);
        dispatch({ type: dishesConstants.GET_DISHES });
      }
    );
  };
}

function addDish(dishName, dishDesc, image, submittedBy, success, failure) {
  console.log("ADD DISH");
  return (dispatch) => {
    dishService.addDish(
      dishName,
      dishDesc,
      image,
      submittedBy,
      (res) => {
        success(res);
        let data = { name: dishName, submittedBy: submittedBy, description: dishDesc, url: image };
        dispatch({ type: dishesConstants.ADD_DISH, data });
      },
      (err) => {
        failure(err);
        dispatch({ type: dishesConstants.GET_DISHES });
      }
    );
  };
}
