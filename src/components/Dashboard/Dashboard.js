import React, { useEffect } from "react";
import { userActions } from "../../actions";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Container from "@material-ui/core/Container";
import { UploadDish } from "./UploadDish";
import { FavouriteDish } from "./FavouriteDish";
import { dishActions } from "../../actions";

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
  }
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpaneladsfsdf-${index}`}
      aria-labelledby={`vertical-tabadfdsf-${index}`}
      {...other}>
      {children}
    </div>
  );
}

function Dashboard(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    console.log("flsdhfk");
    props.getDishes(
      (res) => {},
      (err) => {}
    );
  }, []);

  return (
    <Container component="main">
      <Paper className={classes.paper}>
        <Tabs
          className={classes.tabs}
          value={value}
          indicatorColor="primary"
          onChange={handleChange}
          variant="fullWidth">
          <Tab label="Upload Dish" />
          <Tab label="Favourite Dish" />
        </Tabs>
        <TabPanel value={value} index={0}>
          <UploadDish></UploadDish>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <FavouriteDish></FavouriteDish>
        </TabPanel>
      </Paper>
    </Container>
  );
}

function mapState(state) {
  const isAuthenticated = state.userReducer.isAuthenticated;

  return { isAuthenticated };
}

const actionCreators = {
  login: userActions.login,
  loginSuccessful: userActions.loginSuccessful,
  getDishes: dishActions.getDishes
};

const connectedDashboardPage = connect(mapState, actionCreators)(Dashboard);
export { connectedDashboardPage as Dashboard };
