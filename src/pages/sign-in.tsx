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

  const SignIn = async (e: any) => {
    e.preventDefault();
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
