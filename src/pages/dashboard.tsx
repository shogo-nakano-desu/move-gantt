import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

import { setCurrentUser } from "../utils/reducers";
import TodosComponent from "../components/Todos";
import AddTodoButtonComponent from "../components/AddTodoButton";
import { auth } from "../../firebaseClient";
import AppBarComponent from "../components/AppBar";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: { height: "100%", width: "100%" },
    appbar: {
      height: "9%",
      width: "100%",
    },
    todos: {
      height: "83%",
      width: "100%",
      marginLeft: "5px",
      marginRight: "5px",
    },
    addtodo: {
      height: "8%",
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
    <div style={{ width: "100%", height: "98%" }}>
      <Box className={classes.appbar}>
        <AppBarComponent />
      </Box>
      <Box className={classes.todos}>
        <TodosComponent />
      </Box>
      <Box className={classes.addtodo} display="flex" justifyContent="flex-end">
        <AddTodoButtonComponent />
      </Box>
    </div>
  );
};
export default Dashboard;
