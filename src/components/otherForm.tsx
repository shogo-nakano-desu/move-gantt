import React from "react";
import { useDispatch, useSelector } from "react-redux";
import firebase from "firebase/app";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import CheckboxesGroup from "./Checkboxes";
import { handleNext, stateType, refreshProjectForm } from "../utils/reducers";
import { procedures } from "../info/procedures";
import { auth, db } from "../../firebaseClient";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
export default function OtherFormComponent() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        その他情報を登録
      </Typography>
      {/* <body>
        <form onSubmit={putProjectToFirestore}> */}
      <Grid container spacing={3}>
        {/* <Grid item xs={12} sm={6}> */}
        <CheckboxesGroup />
      </Grid>
      {/* </Grid> */}
    </React.Fragment>
  );
}
