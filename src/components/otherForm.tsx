import React from "react";
import { useDispatch, useSelector } from "react-redux";
import firebase from "firebase/app";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CheckboxesGroup from "./Checkboxes";

export default function OtherFormComponent() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        その他情報を登録
      </Typography>
      <Grid container spacing={3}>
        <CheckboxesGroup />
      </Grid>
    </React.Fragment>
  );
}
