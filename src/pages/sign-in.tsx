// URLを変えたかったら、dynamic routing使えばOKか
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
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

import {
  emailForm,
  passwordForm,
  stateType,
  setCurrentUser,
} from "../utils/reducers";
import { auth, db } from "../../firebaseClient";

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

const SignInComponent: React.VFC = () => {
  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();
  // fetch state from global store
  const email = useSelector((state: stateType) => state.authForm.formEmail);
  const password = useSelector(
    (state: stateType) => state.authForm.formPassword
  );
  const userId = useSelector((state: stateType) => state.user.uid);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      user && router.push("/dashboard"); //dispatch(setCurrentUser(user.uid));もしようとしたらダメだった
    });
  }, [dispatch, router]); // 元々は[]だったのだが、dependencies arrayを作ってとエラーなので入れた。

  const SignIn = async (e: any) => {
    e.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(email, password);
      console.log("userId: ", userId);

      // await db.collection("users").doc(userId);
      // .set({ userId: userId }, { merge: true });
      console.log("sign-in&createdoc");
      router.push("/dashboard");
    } catch (err) {
      alert(err.message);
    }
  };

  const createUserCollection = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    db.collection("users").doc(userId);
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
        {/* ここで２つの関数を呼んでいるのはちょっと怪しい */}
        <form className={classes.form} noValidate onSubmit={SignIn}>
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
              dispatch(passwordForm(e.target.value));
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
          >
            ログイン
          </Button>
        </form>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              パスワードを忘れましたか？
            </Link>
          </Grid>
          <Grid item>
            <Link href="/sign-up">ユーザー登録はこちら</Link>
          </Grid>
        </Grid>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default SignInComponent;
