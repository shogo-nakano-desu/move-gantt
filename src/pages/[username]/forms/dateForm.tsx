import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import DatePickers from "../../../components/Datepickers";

const DateForm = () => {
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
};

export default DateForm;
