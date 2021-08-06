import React from "react";
import { Button } from "@material-ui/core";
import {
  createStyles,
  makeStyles,
  Theme,
  createTheme,
} from "@material-ui/core/styles";
import { sortedProcedures } from "../utils/sortProcedures";
import { Procedure } from "../info/procedures";

const caddiGreen = "rgb(12,151,155)";
// MuiButton-contained変えたい場所
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    gantt: {
      backgroundColor: caddiGreen,
    },
  })
);
const GanttChart = () => {
  const classes = useStyles();
  return (
    <div className="sortedGantt">
      {sortedProcedures.map((procedure: Procedure) => {
        return (
          <Button
            className={classes.gantt}
            variant="contained"
            id={procedure.title}
            key={procedure.title}
          >
            {procedure.title}
          </Button>
        );
      })}
    </div>
  );
};

export default GanttChart;
