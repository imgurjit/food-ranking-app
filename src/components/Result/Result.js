import React from "react";
import { dishActions, userActions } from "../../actions";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import DishCard from "../Dashboard/DishCard";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

function Result(props) {
  const classes = useStyles();

  return (
    <>
      <Container component="main">
        <Paper className={classes.paper}>
          <div style={{ margin: "10px" }}>DISHES CURRENT RANKINGS</div>
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
            {props.dishes
              .sort((a, b) => {
                return b.points - a.points;
              })
              .map((element, i) => {
                return (
                  <DishCard
                    isFavouriteDish={props.favouriteDishes.includes(element["id"])}
                    isResult={true}
                    key={i}
                    rank={i + 1}
                    dish={element}
                  ></DishCard>
                );
              })}
          </div>
        </Paper>
      </Container>
    </>
  );
}

function mapState(state) {
  const dishes = state.dishReducer.dishes;
  const favouriteDishes = state.userReducer.favouriteDishes;

  return { dishes, favouriteDishes };
}

const actionCreators = {
  addToFavouriteDishes: userActions.addToFavouriteDishes,
  removeFromFavouriteDishes: userActions.removeFromFavouriteDishes,
  updateFavouriteDishes: userActions.updateFavouriteDishes,
  updateDishPoints: dishActions.updateDishPoints,
};

const connectedResult = connect(mapState, actionCreators)(Result);
export { connectedResult as Result };
