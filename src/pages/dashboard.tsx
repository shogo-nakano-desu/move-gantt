import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

import TodosComponent from "../components/Todos";
import AddTodoButtonComponent from "../components/AddTodoButton";
import AppBarComponent from "../components/AppBar";
import ChoseProjectComponent from "./chose-project";
import { AuthContext } from "../utils/authProvider";
import { stateType } from "../utils/reducers";

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
  const currentUser = useContext(AuthContext);

  const projectId = useSelector((state: stateType) => state.project.projectId);

  return (
    <>
      {console.log("dashboard userId")}
      {projectId && currentUser.currentUser ? (
        <div style={{ width: "100%", height: "98%" }}>
          <Box className={classes.appbar}>
            <AppBarComponent />
          </Box>
          <Box className={classes.todos}>
            <TodosComponent
              userId={currentUser.currentUser!.uid}
              projectId={projectId}
            />
          </Box>
          <Box
            className={classes.addtodo}
            display="flex"
            justifyContent="flex-end"
          >
            <AddTodoButtonComponent />
          </Box>
        </div>
      ) : currentUser.currentUser ? (
        <ChoseProjectComponent userId={currentUser.currentUser!.uid} />
      ) : (
        <div>ログアウトします</div>
      )}
    </>
  );
};
export default Dashboard;
