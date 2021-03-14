import { mockDishes } from "../services";

export const dishService = {
  getDishes,
  addDish
};

function getDishes(success, failure) {
  console.log("getUserDishes called --> ", mockDishes);
  success(mockDishes);
}

function addDish(dishName, dishDesc, image, submittedBy, success, failure) {
  let dish = {
    name: dishName,
    submittedBy: submittedBy,
    description: dishDesc,
    url: image
  };
  success({ msg: "Dish Added successfully", dish: dish });
  mockDishes.push(dish);
}
