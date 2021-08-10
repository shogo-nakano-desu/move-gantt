import React from "react";
import { calendarGen } from "../utils/calendarGenerator";
import { getYear, getMonth, getDate } from "date-fns";

import {
  createStyles,
  makeStyles,
  Theme,
  createTheme,
} from "@material-ui/core/styles";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: "100%",
      height: "500px",
      display: "flex",
      paddingRight: "40px",
    },
    calendarList: {
      width: "2%",
      textAlign: "center",
      borderLeft: "thin solid rgb(218, 220, 224)",
      height: "100%",
      listStyleType: "none",
    },
  })
);
const CalendarBar = () => {
  const classes = useStyles();
  return (
    <ul id="scheduleGrid" className={classes.container}>
      {calendarGen().map((date) => {
        if (getDate(date) === 1) {
          return (
            <li
              className={classes.calendarList}
              id={`${getYear(date)}-${getMonth(date)}-${getDate(date)}`}
            >{`${getMonth(date)}/${getDate(date)}`}</li>
          );
        } else {
          return (
            <li
              className={classes.calendarList}
              id={`${getYear(date)}-${getMonth(date)}-${getDate(date)}`}
            >{`${getDate(date)}`}</li>
          );
        }
      })}
    </ul>
  );
};

export default CalendarBar;
