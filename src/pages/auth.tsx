// URLを変えたかったら、dynamic routing使えばOKか
import React, { useState } from "react";
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

import { stateType, setCurrentUser, createNewProject } from "../utils/reducers";
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
    width: "100%",
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [isSignIn, setIsSignIn] = useState(true);

  const signIn = async () => {
    try {
      await auth
        .signInWithEmailAndPassword(email, password)
        .then((user) => {
          user.user && dispatch(setCurrentUser(user.user.uid));
          user.user && console.log("user.user.uid", user.user.uid);
          return user.user;
        })
        .then((user) => {
          user &&
            db
              .collection("users")
              .doc(user.uid)
              .collection("projects")
              .orderBy("created_at", "desc")
              .limit(1)
              .get()
              .then((qs) => {
                if (qs.docs[0]) {
                  dispatch(
                    createNewProject(
                      qs.docs[0].id,
                      qs.docs[0].data().willMoveDate,
                      qs.docs[0].data().moveFromPrefecture +
                        qs.docs[0].data().moveFromAddress,
                      qs.docs[0].data().willMovePrefecture +
                        qs.docs[0].data().willMoveAddress
                    )
                  );
                  router.push("/dashboard");
                } else {
                  router.push("/new-project");
                }
              });
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (err) {
      alert(err.message);
    }
  };

  const signUp = async () => {
    try {
      await auth
        .createUserWithEmailAndPassword(email, password)
        .then((user) => {
          user.user && dispatch(setCurrentUser(user.user.uid));
        })
        .then(() => router.push("/dashboard"))
        .catch((err) => console.error(err));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isSignIn ? "ログイン" : "ユーザー登録"}
        </Typography>
        <form className={classes.form} noValidate>
          {!isSignIn && (
            <>
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
                  setUserName(e.target.value);
                }}
              />
            </>
          )}

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
              setEmail(e.target.value);
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
              setPassword(e.target.value);
            }}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="ユーザー情報を記憶しますか？"
          />
          {/* [TODO]このボタンを可変にする */}
          <Button
            disabled={
              isSignIn
                ? !email || password.length < 6
                : !userName || !email || password.length < 6
            }
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={
              isSignIn
                ? // login mode
                  async () => {
                    try {
                      await signIn();
                    } catch (err) {
                      alert(err.message);
                    }
                  }
                : // register mode
                  async () => {
                    try {
                      await signUp();
                    } catch (err) {
                      alert(err.message);
                    }
                  }
            }
          >
            {isSignIn ? "ログイン" : "登録"}
          </Button>
        </form>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              パスワードを忘れましたか？
            </Link>
          </Grid>
          <Grid item>
            <Link
              href="#"
              variant="body2"
              onClick={() => setIsSignIn((s) => !s)}
            >
              {isSignIn ? "ユーザー登録はこちら" : "アカウント作成はこちら"}
            </Link>
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
