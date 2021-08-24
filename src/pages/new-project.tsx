import React, { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import firebase from "firebase/app";
import { add } from "date-fns";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import AddressFormComponent from "../components/addressForm";
import DateFormComponent from "../components/dateForm";
import OtherFormComponent from "../components/otherForm";

import { auth, db } from "../../firebaseClient";
import AppBarComponent from "../components/AppBar";
import {
  stateType,
  refreshProjectForm,
  createNewProject,
  setCurrentUser,
} from "../utils/reducers";
import { AuthContext } from "../utils/authProvider";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: "relative",
    },
    title: {
      marginBottom: theme.spacing(3),
    },
    layout: {
      width: "auto",
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
        width: 600,
        marginLeft: "auto",
        marginRight: "auto",
      },
    },
    paper: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      padding: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(6),
        padding: theme.spacing(3),
      },
    },
    buttons: {
      display: "flex",
      justifyContent: "flex-end",
    },
    button: {
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(1),
      backgroundColor: "rgb(56,162,185)",
      "&:hover": {
        backgroundColor: "rgb(110,162,185)",
      },
    },
  })
);

export default function CreateProjectComponent() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const router = useRouter();
  // const activeStep = useSelector((state: stateType) => state.step.stepNum);
  // useEffect(() => {
  //   auth.onAuthStateChanged((user) => {
  //     user ? dispatch(setCurrentUser(user.uid)) : router.push("/sign-in");
  //   });
  // }, []);
  useEffect(() => {
    dispatch(refreshProjectForm());
  }, []);
  const currentUser = useContext(AuthContext);

  const userId = currentUser.currentUser!.uid;
  // firestoreに新規プロジェクトを作成するための関数群
  const willMovePrefecture = useSelector(
    (state: stateType) => state.projectForm.formWillMovePrefecture
  );
  const willMoveAddress = useSelector(
    (state: stateType) => state.projectForm.formWillMoveAddress
  );
  const moveFromPrefecture = useSelector(
    (state: stateType) => state.projectForm.formMoveFromPrefecture
  );
  const moveFromAddress = useSelector(
    (state: stateType) => state.projectForm.formMoveFromAddress
  );
  const willMoveDate = useSelector(
    (state: stateType) => state.projectForm.formWillMoveDate
  );
  const isNotEmployee = useSelector(
    (state: stateType) => state.projectForm.formIsNotEmployee
  );
  const isStudent = useSelector(
    (state: stateType) => state.projectForm.formIsStudent
  );
  const isPet = useSelector((state: stateType) => state.projectForm.formIsPet);
  const isScooter = useSelector(
    (state: stateType) => state.projectForm.formIsScooter
  );
  const isCar = useSelector((state: stateType) => state.projectForm.formIsCar);
  const isUnderFifteen = useSelector(
    (state: stateType) => state.projectForm.formIsUnderFifteen
  );
  const isFireInsurance = useSelector(
    (state: stateType) => state.projectForm.formIsFireInsurance
  );
  const isFixedPhone = useSelector(
    (state: stateType) => state.projectForm.formIsFixedPhone
  );
  const isMynumber = useSelector(
    (state: stateType) => state.projectForm.formIsMynumber
  );
  const isStampRegistration = useSelector(
    (state: stateType) => state.projectForm.formIsStampRegistration
  );
  const isDrivingLicense = useSelector(
    (state: stateType) => state.projectForm.formIsDrivingLicense
  );

  const putProjectToFirestore = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("firestoreに登録開始");
    await db
      .collection("users")
      .doc(userId)
      .collection("projects")
      .add({
        willMovePrefecture: willMovePrefecture,
        willMoveAddress: willMoveAddress,
        moveFromPrefecture: moveFromPrefecture,
        moveFromAddress: moveFromAddress,
        willMoveDate: willMoveDate!.getTime(),
        isNotEmployee: isNotEmployee,
        isStudent: isStudent,
        isPet: isPet,
        isScooter: isScooter,
        isCar: isCar,
        isUnderFifteen: isUnderFifteen,
        isFireInsurance: isFireInsurance,
        isFixedPhone: isFixedPhone,
        isMynumber: isMynumber,
        isStampRegistration: isStampRegistration,
        isDrivingLicense: isDrivingLicense,
        created_at: Date.now(),
      })
      .then((docRef) => {
        dispatch(createNewProject(docRef.id));
        router.push("/loading");
      });
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography
            className={classes.title}
            component="h1"
            variant="h4"
            align="center"
          >
            引越しプロジェクト登録
          </Typography>

          <React.Fragment>
            <form onSubmit={putProjectToFirestore} id="myform">
              <AddressFormComponent />
              <DateFormComponent />
              <OtherFormComponent />

              <div className={classes.buttons}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  type="submit"
                >
                  登録完了
                </Button>
              </div>
            </form>
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
}
