import React from "react";
import { dishActions, userActions } from "../../actions";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import DishCard from "./DishCard";
import { IconButton } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import DeleteIcon from "@material-ui/icons/Delete";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

function FavouriteDish(props) {
  const classes = useStyles();

  let getMenuItems = () => {
    return props.favouriteDishes.map((e, i) => {
      return (
        <MenuItem key={i} value={i + 1}>
          {i + 1}
        </MenuItem>
      );
    });
  };

  let changeFavouriteOrder = (oldPreferenceNumber, preferenceNumber) => {
    props.updateFavouriteDishes(oldPreferenceNumber, preferenceNumber);
  };

  return (
    <>
      <div style={{ margin: "10px", fontSize: "20px" }}>Select Top 3 dishes</div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <List className={classes.root}>
          {props.favouriteDishes.map((e, i) => {
            let dishDetail = props.dishes.filter((el) => el.id === e);
            return (
              <div key={i}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar variant="square" alt="Image" src={dishDetail[0].url} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <React.Fragment>
                        <Typography component="span" className={classes.inline} color="textPrimary">
                          {dishDetail[0].name}
                        </Typography>
                        <div>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={i + 1}
                            onChange={(event) => {
                              changeFavouriteOrder(i, event.target.value - 1);
                            }}
                          >
                            {getMenuItems()}
                          </Select>
                        </div>
                      </React.Fragment>
                    }
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                        >
                          Submitted By: {dishDetail[0].submittedBy}
                        </Typography>
                      </React.Fragment>
                    }
                  />

                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      color="secondary"
                      onClick={() => {
                        props.removeFromFavouriteDishes(dishDetail[0].id);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider variant="inset" component="li" />
              </div>
            );
          })}
        </List>
      </div>
      {props.favouriteDishes.length > 0 ? (
        <div>
          <Button
            variant="contained"
            color="primary"
            disabled={props.favouriteDishes.length < 3}
            onClick={() => {
              props.updateDishPoints(
                props.dishes,
                props.favouriteDishes,
                (res) => {
                  props.cb();
                },
                (err) => {}
              );
            }}
          >
            Submit
          </Button>
        </div>
      ) : (
        ""
      )}

      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
        {props.dishes.map((element, i) => {
          return (
            <DishCard
              isFavouriteTab={true}
              key={i}
              dish={element}
              isFavouriteDish={props.favouriteDishes.includes(element["id"])}
              updateFavouriteDish={(isFavouriteDish) => {
                if (isFavouriteDish && props.favouriteDishes.length < 3)
                  props.addToFavouriteDishes(element["id"]);
                else props.removeFromFavouriteDishes(element["id"]);
              }}
            ></DishCard>
          );
        })}
      </div>
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

const connectedFavouriteDish = connect(mapState, actionCreators)(FavouriteDish);
export { connectedFavouriteDish as FavouriteDish };
