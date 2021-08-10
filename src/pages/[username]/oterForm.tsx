import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CheckboxesGroup from "../../components/Checkboxes";

const OtherForm = () => {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        その他情報を登録
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <CheckboxesGroup />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default OtherForm;
