import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import firebase from "firebase/app";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { Link as MaterialLink } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

import AddressFormComponent from "../components/addressForm";
import DateFormComponent from "../components/dateForm";
import OtherFormComponent from "../components/otherForm";

import DateForm from "../components/dateForm";
import OtherForm from "../components/otherForm";
import { auth, db } from "../../firebaseClient";
import { setCurrentUser } from "../utils/reducers";
import AppBarComponent from "../components/AppBar";
import { stateType, refreshProjectForm } from "../utils/reducers";
import { procedures } from "../info/procedures";

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
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      user ? dispatch(setCurrentUser(user.uid)) : router.push("/sign-in");
    });
  }, [dispatch, router]); // 元は[]だった。

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

  // 最後にstateを空にする処理を忘れずに書く
  // この前に、usercollectionを作成して、そこに入れるようにしたほうが良さげ
  const putProjectToFirestore = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const filteredTodos = procedures.filter((procedure) => {
      // ロジックはOK
      if (
        !(isCar === false && procedure.isCar === true) &&
        !(isDrivingLicense === false && procedure.isDrivingLicense === true) &&
        !(isFireInsurance === false && procedure.isFireInsurance === true) &&
        !(isFixedPhone === false && procedure.isFixedPhone === true) &&
        !(isMynumber === false && procedure.isMynumber === true) &&
        !(isPet === false && procedure.isPet === true) &&
        !(isScooter === false && procedure.isScooter === true) &&
        !(isNotEmployee === false && procedure.isNotEmployee === true) &&
        !(
          isStampRegistration === false &&
          procedure.isStampRegistration === true
        ) &&
        !(isStudent === false && procedure.isStudent === true) &&
        !(isUnderFifteen === false && procedure.isUnderFifteen === true)
      ) {
        return true;
      }
    });
    console.log("filteredTodos:", filteredTodos);
    console.log("firestoreに登録開始");
    db.collection("users")
      .doc(userId)
      .collection("projects")
      .add({
        willMovePrefecture: willMovePrefecture,
        willMoveAddress: willMoveAddress,
        moveFromPrefecture: moveFromPrefecture,
        moveFromAddress: moveFromAddress,
        willMoveDate: willMoveDate,
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
        created_at: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((docRef) => {
        console.log("ループ前のprojectId", docRef.id);
        for (let i = 0; i < filteredTodos.length; i++) {
          console.log(i);
          db.collection("users")
            .doc(userId)
            .collection("projects")
            .doc(docRef.id)
            .collection("todos")
            .add(filteredTodos[i]);
        }
        console.log("TODOS登録も完了");
      })
      .then(() => {
        dispatch(refreshProjectForm());
        console.log("project stateの初期化完了");
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBarComponent></AppBarComponent>
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
