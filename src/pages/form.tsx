import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import firebase from "firebase/app";

import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import { Link as MaterialLink } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

import AddressFormComponent from "../components/addressForm";
import DateForm from "../components/dateForm";
import OtherForm from "../components/oterForm";
import { auth, db } from "../../firebaseClient";
import { setCurrentUser } from "../utils/reducers";
import AppBarComponent from "../components/AppBar";
import { stateType } from "../utils/reducers";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <MaterialLink color="inherit" href="https://material-ui.com/">
        Your Website
      </MaterialLink>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
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
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ["住所登録", "引越し予定日登録", "その他情報登録"];

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <AddressFormComponent />;
    case 1:
      return <DateForm />;
    case 2:
      return <OtherForm />;
    default:
      throw new Error("Unknown step");
  }
}

export default function CreateProjectComponent() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const router = useRouter();
  const [activeStep, setActiveStep] = React.useState(0);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      user ? dispatch(setCurrentUser(user.uid)) : router.push("/sign-in");
    });
  }, []);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const userId = useSelector((state: stateType) => state.user.uid);
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
  const isSelfEmployed = useSelector(
    (state: stateType) => state.projectForm.formIsSelfEmployed
  );
  const isStudent = useSelector(
    (state: stateType) => state.projectForm.formIsStudent
  );
  const isPet = useSelector((state: stateType) => state.projectForm.formIsPet);
  const isScooter = useSelector(
    (state: stateType) => state.projectForm.formIsScooter
  );
  const isCar = useSelector((state: stateType) => state.projectForm.formIsCar);
  // 最後にstateを空にする処理を忘れずに書く
  // この前に、usercollectionを作成して、そこに入れるようにしたほうが良さげ
  const putProjectToFirestore = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    db.collection("users").doc(userId).collection("projects").add({
      willMovePrefecture: willMovePrefecture,
      willMoveAddress: willMoveAddress,
      moveFromPrefecture: moveFromPrefecture,
      moveFromAddress: moveFromAddress,
      willMoveDate: willMoveDate,
      isSelfEmployed: isSelfEmployed,
      isStudent: isStudent,
      isPet: isPet,
      isScooter: isScooter,
      isCar: isCar,
      created_at: firebase.firestore.FieldValue.serverTimestamp(),
    });
    // ここにstateをリフレッシュする処理を書いておく
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBarComponent></AppBarComponent>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            引越しプロジェクト登録
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  プロジェクト登録完了！
                </Typography>
                <Link href="/dashboard">
                  <a>ダッシュボードに戻る</a>
                </Link>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <form onSubmit={putProjectToFirestore}>
                  {getStepContent(activeStep)}
                  <div className={classes.buttons}>
                    {activeStep !== 0 && (
                      <Button onClick={handleBack} className={classes.button}>
                        戻る
                      </Button>
                    )}
                    {activeStep === steps.length - 1 ? (
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        className={classes.button}
                      >
                        登録完了
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        className={classes.button}
                      >
                        次へ
                      </Button>
                    )}
                  </div>
                </form>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </main>
    </React.Fragment>
  );
}
