import React, { useState } from "react";
import { dishActions } from "../../actions";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import DishCard from "./DishCard";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { CloudUpload, Delete, PhotoCamera } from "@material-ui/icons";
import Grid from "@material-ui/core/Grid";
import { IconButton } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  tabs: {
    width: "100%",
    background: "#80FFE8",
    color: "black"
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1)
  },
  input: {
    display: "none"
  },
  image: {
    maxWidth: "200px",
    minWidth: "200px"
  }
}));

function FavouriteDish(props) {
  const classes = useStyles();
  const [dishName, setDishName] = useState("");
  const [dishDesc, setDishDesc] = useState("");
  const [dishImage, setDishImage] = useState("");

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
        {props.dishes.map((element, i) => {
          return <DishCard isFavouriteTab={true} key={i} dish={element}></DishCard>;
        })}
      </div>
    </>
  );
}

function mapState(state) {
  const dishes = state.dishReducer.dishes;

  return { dishes };
}

const actionCreators = {
  getDishes: dishActions.getDishes,
  addDish: dishActions.addDish
};

const connectedFavouriteDish = connect(mapState, actionCreators)(FavouriteDish);
export { connectedFavouriteDish as FavouriteDish };
