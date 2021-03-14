import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { userActions } from "../../actions";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

function Login(props) {
  const classes = useStyles();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  let handleSubmit = (event) => {
    console.log("A name was submitted: ", event);
    event.preventDefault();
    if (username !== "" && password !== "") {
      props.login(
        username,
        password,
        (res) => {
          console.log("sdkhsdfk --> ", res);
          props.history.push("/dashboard");
        },
        (err) => {}
      );
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <div>dfgf{JSON.stringify(props.isAuthenticated)}</div>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={password}
            onChange={(e) => {
              console.log("A name was submitted: ", e.target.value);
              setPassword(e.target.value);
            }}
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            Login
          </Button>
        </form>
      </div>
    </Container>
  );
}

function mapState(state) {
  const isAuthenticated = state.userReducer.isAuthenticated;

  return { isAuthenticated };
}

const actionCreators = {
  login: userActions.login,
  loginSuccessful: userActions.loginSuccessful
};

const connectedLoginPage = connect(mapState, actionCreators)(Login);
export { connectedLoginPage as Login };
