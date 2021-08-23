import React from "react";
import { useDispatch } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import DatePickers from "./Datepickers";

export default function DateFormComponent() {
  const dispatch = useDispatch();

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
