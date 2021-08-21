import React from "react";
import { useDispatch } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import DatePickers from "./Datepickers";
import { handleNext, handleBack, stateType } from "../utils/reducers";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {},
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    buttons: {
      display: "flex",
      justifyContent: "flex-end",
    },
    button: {
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(1),
    },
  })
);

export default function DateFormComponent() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleNextStep = () => {
    dispatch(handleNext());
  };
  const handleBackStep = () => {
    dispatch(handleBack());
  };
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        引越し予定日を登録
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <DatePickers />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
