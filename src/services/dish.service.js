import { uuid } from "uuidv4";

export const dishService = {
  addDish,
  updateDishPoints,
};

function addDish(dishName, dishDesc, image, submittedBy, success, failure) {
  let dish = {
    id: uuid(),
    name: dishName,
    submittedBy: submittedBy,
    description: dishDesc,
    url: image,
    points: 0,
  };
  success({ msg: "Dish Added successfully", dish: dish });
}

function updateDishPoints(allDishes, dishes, success, failure) {
  dishes.forEach((e, i) => {
    let dish = allDishes.find((el) => el.id === e);
    if (i === 0) dish.points = dish.points + 30;
    else if (i === 1) dish.points = dish.points + 20;
    else if (i === 2) dish.points = dish.points + 10;
    else return "";
  });
  success({ msg: "Dish Points updated successfully", dish: dishes });
}
