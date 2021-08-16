import React from "react";
import AddTaskIcon from "@material-ui/icons/AddTask";
import Button from "@material-ui/core/Button";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
      backgroundColor: "rgb(56,162,185)",
    },
  })
);

export default function AddTodoButtonComponent() {
  const classes = useStyles();

  return (
    <Button
      variant="contained"
      color="primary"
      size="large"
      className={classes.button}
      startIcon={<AddTaskIcon />}
    >
      TODOを追加する
    </Button>
  );
}
