import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import firebase from "firebase";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Box from "@material-ui/core/Box";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from "@material-ui/core/Dialog";
import { getMonth, getDate } from "date-fns";

import { splittedProcedures } from "../utils/splitProcedures";
import { TARGET_PERSON } from "../info/procedures";
import { auth, db } from "../../firebaseClient";
import {
  listenProcedures,
  stateType,
  isEditTodoOpen,
  setTodoId,
  setTodoTitle,
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

  const procedures = useSelector((state: stateType) => state.procedures);
  const shapedProcedures = splittedProcedures(procedures);

  const handleCompleteChage = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
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
          } else if (doc.data()!.complete === false) {
            db.collection("users")
              .doc(props.userId)
              .collection("projects")
              .doc(props.projectId)
              .collection("todos")
              .doc(e.target.id)
              .update({ complete: true });
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
              {/*[TODO]ここだけ可変にする必要がある */}
            </Typography>
            <div className={classes.demo}>
              <List dense={false}>
                {procedures.map((procedure) => {
                  return (
                    <ListItem key={procedure.id}>
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
