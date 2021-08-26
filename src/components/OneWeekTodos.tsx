import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import { getMonth, getDate } from "date-fns";

import { splittedProcedures } from "../utils/splitProcedures";
import { db } from "../../firebaseClient";
import { AuthContext } from "../utils/authProvider";
import {
  stateType,
  isEditTodoOpen,
  setTodoId,
  setTodoTitle,
  isDetailOpen,
  setTodoDetail,
  procedureType,
} from "../utils/reducers";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      maxWidth: 2000,
    },
    demo: {
      backgroundColor: theme.palette.background.paper,
    },
    title: {
      margin: theme.spacing(4, 0, 2),
    },
    container: {
      maxWidth: "12%",
    },
  })
);

interface Props {
  userId: string;
  projectId: string;
  title: string[];
}

export const OneWeekTodosComponent = (props: Props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentUser = useContext(AuthContext);
  const [shapedProcedures, setShapedProcedures] = useState<procedureType[][]>(
    []
  );

  const procedures = useSelector((state: stateType) => state.procedures);
  useEffect(() => {
    currentUser && console.log("oneWeekTodos 処理開始");
    db.collection("users")
      .doc(currentUser.currentUser!.uid)
      .collection("projects")
      .doc(props.projectId)
      .get()
      .then((doc) => {
        if (doc) {
          const moveDate = doc.data()!.willMoveDate;
          console.log("before split procedures");
          setShapedProcedures(splittedProcedures(procedures, moveDate));
          console.log("after split procedures");
        } else {
          console.log("there is no todos");
        }
      })
      .catch((error) => {
        console.error("Error happened when rendering todos", error);
      });
  }, [procedures, props.projectId, props.userId, currentUser.currentUser]);

  const handleCompleteChage = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    console.log("TODOをコンプリートトライ");
    await db
      .collection("users")
      .doc(props.userId)
      .collection("projects")
      .doc(props.projectId)
      .collection("todos")
      .doc(e.target.id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          if (doc.data()!.complete === true) {
            db.collection("users")
              .doc(props.userId)
              .collection("projects")
              .doc(props.projectId)
              .collection("todos")
              .doc(e.target.id)
              .update({ complete: false });
            console.log("todoのアップデート成功");
          } else if (doc.data()!.complete === false) {
            db.collection("users")
              .doc(props.userId)
              .collection("projects")
              .doc(props.projectId)
              .collection("todos")
              .doc(e.target.id)
              .update({ complete: true });
            console.log("todoのアップデート成功");
          } else {
            console.error("該当するデータがありません");
          }
        }
      })
      .catch((error) => {
        console.error("Error getting document", error);
      });
  };

  const handleClickOpen = (id: string, title: string) => {
    dispatch(isEditTodoOpen(true));
    dispatch(setTodoId(id));
    dispatch(setTodoTitle(title));
  };
  const handleDetailOpen = (
    id: string,
    title: string,
    startDate: number,
    deadline: number,
    confirmationSource: string,
    memo: string,
    submitDestination: string,
    targetPerson: string,
    complete: boolean
  ) => {
    dispatch(isDetailOpen(true));
    dispatch(
      setTodoDetail(
        id,
        title,
        startDate,
        deadline,
        confirmationSource,
        memo,
        submitDestination,
        targetPerson,
        complete
      )
    );
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        {shapedProcedures.map((procedures, index) => (
          <Grid
            item
            xs={2}
            md={2}
            lg={2}
            xl={2}
            className={classes.container}
            key={index}
          >
            <Typography variant="h6" className={classes.title}>
              {props.title[index]}
            </Typography>
            <div className={classes.demo}>
              <List dense={false}>
                {procedures.map((procedure) => {
                  return (
                    <ListItem
                      key={procedure.id}
                      onClick={() =>
                        handleDetailOpen(
                          procedure.id,
                          procedure.title,
                          procedure.startDate,
                          procedure.deadline,
                          procedure.confirmationSource,
                          procedure.memo,
                          procedure.submitDestination,
                          procedure.targetPerson,
                          procedure.complete
                        )
                      }
                    >
                      <Box>
                        <ListItemText
                          primary={procedure.title}
                          secondary={`期限：${getMonth(
                            new Date(procedure.deadline)
                          )}/${getDate(new Date(procedure.deadline))}`}
                        />
                      </Box>
                      <Box>
                        <Grid container direction="column">
                          <Checkbox
                            id={procedure.id}
                            checked={procedure.complete}
                            name="completed"
                            color="primary"
                            edge="end"
                            onChange={handleCompleteChage}
                          />
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() =>
                              handleClickOpen(procedure.id, procedure.title)
                            }
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Grid>
                      </Box>
                    </ListItem>
                  );
                })}
              </List>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
