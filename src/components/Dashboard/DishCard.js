import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "calc(50% - 40px)",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
    margin: "10px",
    border: "1px solid #00000038",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function DishCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        title={props.dish.name}
        subheader={
          props.isFavouriteTab ? (
            props.dish.submittedBy
          ) : props.isFavouriteDish && props.isResult ? (
            <Chip label="Your Favourite Dish" />
          ) : (
            ""
          )
        }
      />

      {props.isResult ? (
        <CardContent>
          <Typography component="span">Points: {props.dish.points}</Typography>
          <Typography component="p">#{props.rank}</Typography>
        </CardContent>
      ) : (
        ""
      )}
      <CardMedia className={classes.media} image={props.dish.url} />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.dish.description}
        </Typography>
      </CardContent>

      <CardActions style={{ display: "flex", justifyContent: "center" }}>
        {props.isFavouriteTab ? (
          <FormControlLabel
            control={
              <Checkbox
                checked={props.isFavouriteDish}
                onClick={(e) => {
                  props.updateFavouriteDish(e.target.checked);
                }}
                name="checkedA"
              />
            }
            label="Select Dish"
          />
        ) : (
          ""
        )}
        {props.isUpload ? (
          <IconButton
            aria-label="delete"
            color="secondary"
            onClick={() => {
              props.deleteDish();
            }}
          >
            <DeleteIcon />
          </IconButton>
        ) : (
          ""
        )}
      </CardActions>
    </Card>
  );
}
