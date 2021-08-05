import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { getYear, getMonth, getDate } from "date-fns";

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

const dateGenerator = () => {
  const today = new Date();
  const year = "" + getYear(today);
  let month: string | number = getMonth(today) + 1;
  if (month < 10) {
    month = "0" + month;
  } else {
    month = "" + month;
  }
  let date: string | number = getDate(today);
  if (date < 10) {
    date = "0" + date;
  } else {
    date = "" + date;
  }
  return {
    year: year,
    month: month,
    date: date,
  };
};

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
