import React from "react";
import { useReducer } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { emailForm, passwordForm, userNameForm } from "../app/reducers";
import { Login } from "../utils/auth";
import { auth, provider } from "../../firebase";
import { stateType } from "../app/reducers";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        House-moving Manager
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  // これは消したい
  // const [state, dispatch] = useReducer(reducers, initialState);

  // refer dispatch func from store by useDispatch hooks
  const dispatch = useDispatch();
  // fetch state from global store
  const email = useSelector((state: stateType) => state.authForm.formEmail);
  const password = useSelector(
    (state: stateType) => state.authForm.formPassword
  );
  const userName = useSelector(
    (state: stateType) => state.authForm.formUserName
  );
  const signInEmail = async (state: stateType) => {
    await auth.signInWithEmailAndPassword(
      state.authForm.formEmail,
      state.authForm.formPassword
    );
  };

  const signUpEmail = async () => {
    const authUser = await auth.createUserWithEmailAndPassword(email, password);

    await authUser.user?.updateProfile({
      displayName: userName,
    });
    dispatch(userNameForm(userName));
  };

  const signInGoogle = async () => {
    await auth.signInWithPopup(provider).catch((err) => alert(err.message));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          ログイン
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="username"
            label="ユーザー名"
            id="username"
            autoComplete="username"
            autoFocus
            value={userName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              dispatch(userNameForm(e.target.value));
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="メールアドレス"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              dispatch(emailForm(e.target.value));
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="パスワード"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              dispatch(userNameForm(e.target.value));
            }}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="ユーザー情報を記憶しますか？"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => Login(email, password)}
          >
            ログイン
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                パスワードを忘れましたか？
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"アカウント作成はこちら"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
