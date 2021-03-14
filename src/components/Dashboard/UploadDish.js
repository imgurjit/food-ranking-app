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
    width: "50%",
    margin: "10px",
    marginTop: theme.spacing(1),
    [theme.breakpoints.down("xs")]: {
      width: "100%"
    }
  },
  input: {
    display: "none"
  },
  image: {
    maxWidth: "200px",
    minWidth: "200px"
  }
}));

function UploadDish(props) {
  const classes = useStyles();
  const [dishName, setDishName] = useState("");
  const [dishDesc, setDishDesc] = useState("");
  const [dishImage, setDishImage] = useState("");
  const [canUploadImage, setCanUploadImage] = useState(false);

  let handleUploadClick = (event) => {
    console.log(event);
    var file = event.target.files[0];
    const reader = new FileReader();
    var url = reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      console.log(reader.result);
      setDishImage(reader.result);
    }.bind(this);
  };

  let getUserDishes = () => {
    return props.dishes.map((element, i) => {
      if (element.submittedBy === sessionStorage.getItem("username"))
        return <DishCard key={i} dish={element}></DishCard>;
    });
  };

  let checkCanUpload = () => {
    console.log(props.dishes.filter((el) => el.submittedBy === sessionStorage.getItem("username")).length >= 2);
    return props.dishes.filter((el) => el.submittedBy === sessionStorage.getItem("username")).length >= 2;
  };

  let submitDish = (event) => {
    event.preventDefault();
    console.log("SUBMIT DISH CALLED");
    props.addDish(
      dishName,
      dishDesc,
      dishImage,
      sessionStorage.getItem("username"),
      (res) => {
        setDishImage("");
        setDishName("");
        setDishDesc("");
        setCanUploadImage(false);
      },
      (err) => {}
    );
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {canUploadImage ? (
          <form className={classes.form} noValidate onSubmit={submitDish}>
            <div>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                value={dishName}
                onChange={(e) => {
                  setDishName(e.target.value);
                }}
                id="dishName"
                label="Dish Name"
                name="dishName"
                autoComplete="dishName"
                autoFocus
              />
            </div>
            <div>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                value={dishDesc}
                onChange={(e) => {
                  console.log("A name was submitted: ", e.target.value);
                  setDishDesc(e.target.value);
                }}
                name="dishDesc"
                label="Dish Description"
                id="dishDesc"
              />
            </div>
            <div>
              <Grid container justify="center" alignItems="center">
                {dishImage ? (
                  <div style={{ display: "flex" }}>
                    <img className={classes.image} src={dishImage}></img>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <IconButton
                        component="span"
                        className={classes.button}
                        color="red"
                        onClick={() => {
                          setDishImage(undefined);
                        }}>
                        <Delete></Delete>
                      </IconButton>
                    </div>
                  </div>
                ) : (
                  <div style={{ display: "flex" }}>
                    <input
                      accept="image/*"
                      className={classes.input}
                      id="contained-button-file"
                      multiple
                      type="file"
                      onChange={handleUploadClick}
                    />
                    <label htmlFor="contained-button-file">
                      <IconButton component="span" className={classes.button} color="primary">
                        <CloudUpload></CloudUpload>
                      </IconButton>
                    </label>
                    <div style={{ margin: "10px" }}>Or</div>
                    <IconButton className={classes.button} color="primary">
                      <PhotoCamera></PhotoCamera>
                    </IconButton>
                  </div>
                )}
              </Grid>
            </div>
            <div style={{ marginTop: "10px" }}>
              <Button type="submit" variant="contained" color="primary" className={classes.submit}>
                Submit
              </Button>

              <Button
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={() => {
                  setCanUploadImage(false);
                }}>
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div style={{ marginTop: "10px" }}>
            <Button
              variant="contained"
              color="primary"
              disabled={checkCanUpload()}
              className={classes.submit}
              onClick={() => {
                setCanUploadImage(true);
              }}>
              Add Dish
            </Button>
          </div>
        )}
      </div>
      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>{getUserDishes()}</div>
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

const connectedUploadDishPage = connect(mapState, actionCreators)(UploadDish);
export { connectedUploadDishPage as UploadDish };
