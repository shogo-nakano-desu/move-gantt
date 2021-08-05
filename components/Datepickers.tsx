import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import dateGenerator from "../utils/dateGenerator";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexWrap: "wrap",
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  })
);

export default function DatePickers() {
  const classes = useStyles();
  return (
    <form className={classes.container} noValidate>
      <TextField
        id="movedate"
        // label="引越し予定日"
        type="date"
        defaultValue={`${dateGenerator().year}-${dateGenerator().month}-${
          dateGenerator().date
        }`}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
  );
}
