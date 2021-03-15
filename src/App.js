import "./App.css";
import React from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Login } from "./components/Login/Login";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { Result } from "./components/Result/Result";
import { useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { history } from "./helpers";
import { userActions } from "./actions";
import { connect } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function App(props) {
  const classes = useStyles();
  const isAuthenticated = useSelector((state) => {
    return state.userReducer.isAuthenticated;
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    props.closeSnackBar(true);
  };

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
            }}
          />
        )
      }
    />
  );

  return (
    <div className="App">
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Food Ranking
            </Typography>
            {isAuthenticated ? (
              <Button
                color="inherit"
                onClick={() => {
                  props.logout(
                    (res) => {},
                    (err) => {}
                  );
                }}
              >
                Logout
              </Button>
            ) : (
              ""
            )}
          </Toolbar>
        </AppBar>
      </div>
      <Router history={history}>
        <Switch>
          <Route path="/login" component={Login}></Route>
          <PrivateRoute path="/dashboard" component={Dashboard}></PrivateRoute>
          <PrivateRoute path="/result" component={Result}></PrivateRoute>
          <Redirect from="/" to="/login" />
        </Switch>
      </Router>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={props.showSnackbar}
        autoHideDuration={3000}
        onClose={handleClose}
        message={props.snackBarMessage}
      />
    </div>
  );
}

function mapState(state) {
  const isAuthenticated = state.userReducer.isAuthenticated;
  const showSnackbar = state.userReducer.showSnackbar;
  const snackBarMessage = state.userReducer.snackBarMessage;

  return { isAuthenticated, showSnackbar, snackBarMessage };
}

const actionCreators = {
  logout: userActions.logout,
  closeSnackBar: userActions.closeSnackBar,
};

const connectedAppPage = connect(mapState, actionCreators)(App);
export { connectedAppPage as App };
