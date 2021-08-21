import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { dateGenerator } from "../utils/dateGenerator";
import { willMoveDateForm, stateType } from "../utils/reducers";
import { dateParser } from "../utils/dateParser";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexWrap: "wrap",
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      marginBottom: theme.spacing(2),
      width: 200,
    },
  })
);

export default function DatePickers() {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <TextField
      id="movedate"
      type="date"
      className={classes.textField}
      InputLabelProps={{
        shrink: true,
      }}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(willMoveDateForm(dateParser(e.target.value)));
      }}
    />
  );
}
