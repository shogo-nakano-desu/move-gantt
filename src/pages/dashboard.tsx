import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { Container } from "@material-ui/core";
import { sizing } from "@material-ui/system";

import { setCurrentUser } from "../utils/reducers";
import TodosComponent from "../components/Todos";
import AddTodoButtonComponent from "../components/AddTodoButton";
import { auth } from "../../firebase";
import AppBarComponent from "../components/AppBar";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: { height: "100%", width: "100%" },
    appbar: {
      height: "7%",
      width: "100%",
    },
    todos: {
      height: "85%",
      width: "100%",
    },
    addtodo: {
      height: "10%",
      width: "100%",
    },
    addtodocontainer: {
      height: "100%",
      width: "100%",
    },
  })
);

const Dashboard = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      user ? dispatch(setCurrentUser(user.uid)) : router.push("/sign-in");
    });
  }, []);

  return (
    <Grid container>
      <Grid className={classes.appbar} item>
        <AppBarComponent />
      </Grid>
      <Grid className={classes.todos} item>
        <TodosComponent />
      </Grid>
      <Grid className={classes.addtodo} container alignContent="space-between">
        <AddTodoButtonComponent />
      </Grid>
    </Grid>
  );
};
export default Dashboard;
