import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import firebase from "firebase";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import { getMonth, getDate } from "date-fns";

import { splittedProcedures } from "../utils/splitProcedures";
import { TARGET_PERSON } from "../info/procedures";
import { auth, db } from "../../firebaseClient";
import { listenProcedures, stateType } from "../utils/reducers";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      maxWidth: 2000,
    },
    demo: {
      backgroundColor: theme.palette.background.paper,
    },
    title: {
      margin: theme.spacing(4, 0, 2),
    },
    container: {
      maxWidth: "12%",
    },
  })
);

interface Props {
  userId: string;
  projectId: string;
}

// あとは中にデータ入れれば完成
export default function TodosComponent(props: Props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  // const userId = useSelector((state: stateType) => state.user.uid);
  const projectId = useSelector((state: stateType) => state.project.projectId);
  const procedures = useSelector((state: stateType) => state.procedures);

  const shapedProcedures = splittedProcedures(procedures);
  // firestoreのデータに型をつける
  type DataItemType = {
    title: string;
    startDate: number; // プロジェクト作成日か関数で計算した日付
    deadline: number;
    submitDestination: string;
    targetPerson: string;
    confirmationSource: string;
    memo: string;
    complete: boolean;
    isNotEmployee: boolean;
    isStudent: boolean;
    isPet: boolean;
    isScooter: boolean;
    isCar: boolean;
    isParking: boolean;
    isUnderFifteen: boolean;
    isFireInsurance: boolean;
    isFixedPhone: boolean;
    isMynumber: boolean;
    isStampRegistration: boolean;
    isDrivingLicense: boolean;
  };
  type DataType = DataItemType[];

  const isValid = (data: any): data is DataItemType => {
    if (!(data.startDate && typeof data.startDate === "number")) {
      return false;
    }
    if (!(data.deadline && typeof data.deadline === "number")) {
      return false;
    }
    if (!(data.title && typeof data.title === "string")) {
      return false;
    }
    if (
      !(data.submitDestination && typeof data.submitDestination === "string")
    ) {
      return false;
    }
    if (
      !(data.confirmationSource && typeof data.confirmationSource === "string")
    ) {
      return false;
    }

    // [TODO]以下なぜか全て落ちる。
    if (!(data.memo != null && typeof data.memo === "string")) {
      return false;
    } // [TODO]この型で落ちる
    // if (!(data.complete && typeof data.complete === "boolean")) {
    //   return false;
    // } // [TODO]この型で落ちる

    if (
      !(data.isNotEmployee != null && typeof data.isNotEmployee === "boolean")
    ) {
      return false;
    }
    if (!(data.isStudent != null && typeof data.isStudent === "boolean")) {
      return false;
    }
    if (!(data.isPet != null && typeof data.isPet === "boolean")) {
      return false;
    }
    if (!(data.isScooter != null && typeof data.isScooter === "boolean")) {
      return false;
    }
    if (!(data.isCar != null && typeof data.isCar === "boolean")) {
      return false;
    }
    if (!(data.isParking != null && typeof data.isParking === "boolean")) {
      return false;
    }
    if (
      !(data.isUnderFifteen != null && typeof data.isUnderFifteen === "boolean")
    ) {
      return false;
    }
    if (
      !(
        data.isFireInsurance != null &&
        typeof data.isFireInsurance === "boolean"
      )
    ) {
      return false;
    }
    if (
      !(data.isFixedPhone != null && typeof data.isFixedPhone === "boolean")
    ) {
      return false;
    }
    if (!(data.isMynumber != null && typeof data.isMynumber === "boolean")) {
      return false;
    }
    if (
      !(
        data.isStampRegistration != null &&
        typeof data.isStampRegistration === "boolean"
      )
    ) {
      return false;
    }
    if (
      !(
        data.isDrivingLicense != null &&
        typeof data.isDrivingLicense === "boolean"
      )
    ) {
      return false;
    }
    return true;
  };

  const converter = {
    toFirestore(procedure: DataItemType): firebase.firestore.DocumentData {
      return {
        title: procedure.title,
        startDate: procedure.startDate, // プロジェクト作成日か関数で計算した日付
        deadline: procedure.deadline, //[TODO]これは１ヶ月前のパターンもあることを明示するか、選択できるようにしたい
        submitDestination: procedure.submitDestination, //
        targetPerson: procedure.targetPerson,
        confirmationSource: procedure.confirmationSource,
        memo: procedure.memo,
        complete: procedure.complete,
        isNotEmployee: procedure.isNotEmployee,
        isStudent: procedure.isStudent,
        isPet: procedure.isPet,
        isScooter: procedure.isScooter,
        isCar: procedure.isCar,
        isParking: procedure.isParking,
        isUnderFifteen: procedure.isUnderFifteen,
        isFireInsurance: procedure.isFireInsurance,
        isFixedPhone: procedure.isFixedPhone,
        isMynumber: procedure.isMynumber,
        isStampRegistration: procedure.isStampRegistration,
        isDrivingLicense: procedure.isDrivingLicense,
      };
    },
    fromFirestore(
      snapshot: firebase.firestore.QueryDocumentSnapshot,
      options: firebase.firestore.SnapshotOptions
      //ここにfirestoreのFieldの型を書く
    ): DataItemType {
      const data = snapshot.data(options)!;
      if (!isValid(data)) {
        console.error(data);
        alert("invalid data");
        throw new Error("invalid data");
      }
      return {
        title: data.title,
        startDate: data.startDate, // プロジェクト作成日か関数で計算した日付
        deadline: data.deadline, //[TODO]これは１ヶ月前のパターンもあることを明示するか、選択できるようにしたい
        submitDestination: data.submitDestination, //
        targetPerson: data.targetPerson,
        confirmationSource: data.confirmationSource,
        memo: data.memo,
        complete: data.complete,
        isNotEmployee: data.isNotEmployee,
        isStudent: data.isStudent,
        isPet: data.isPet,
        isScooter: data.isScooter,
        isCar: data.isCar,
        isParking: data.isParking,
        isUnderFifteen: data.isUnderFifteen,
        isFireInsurance: data.isFireInsurance,
        isFixedPhone: data.isFixedPhone,
        isMynumber: data.isMynumber,
        isStampRegistration: data.isStampRegistration,
        isDrivingLicense: data.isDrivingLicense,
      };
    },
  };

  useEffect(() => {
    console.log("props.userId", props.userId);
    console.log("props.projectId", props.projectId);
    const unSub = db
      .collection("users")
      .doc(props.userId)
      .collection("projects")
      .doc(props.projectId)
      .collection("todos")
      .withConverter(converter)
      .orderBy("deadline", "desc")
      .orderBy("startDate", "desc")
      .onSnapshot((snapshot) => {
        dispatch(
          listenProcedures(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              title: doc.data().title,
              startDate: doc.data().startDate, // プロジェクト作成日か関数で計算した日付
              deadline: doc.data().deadline, //[TODO]これは１ヶ月前のパターンもあることを明示するか、選択できるようにしたい
              submitDestination: doc.data().submitDestination, //
              targetPerson: doc.data().targetPerson,
              confirmationSource: doc.data().confirmationSource,
              memo: doc.data().memo,
              complete: doc.data().complete,
              isNotEmployee: doc.data().isNotEmployee,
              isStudent: doc.data().isStudent,
              isPet: doc.data().isPet,
              isScooter: doc.data().isScooter,
              isCar: doc.data().isCar,
              isParking: doc.data().isParking,
              isUnderFifteen: doc.data().isUnderFifteen,
              isFireInsurance: doc.data().isFireInsurance,
              isFixedPhone: doc.data().isFixedPhone,
              isMynumber: doc.data().isMynumber,
              isStampRegistration: doc.data().isStampRegistration,
              isDrivingLicense: doc.data().isDrivingLicense,
            }))
          )
        );
      });
    return () => {
      unSub();
    };
  }, []);
  // console.log(filteredProjectData);
  //const firstTitleRef = useRef<HTMLDivElement>(null);

  // firestoreから直ゲットトライ
  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={2} md={2} lg={2} xl={2} className={classes.container}>
          <Typography variant="h6" className={classes.title}>
            1ヶ月以上前まで
          </Typography>
          <div className={classes.demo}>
            <List dense={false}>
              {shapedProcedures.weekOneProcedures.map((procedure) => (
                <ListItem key={procedure.title}>
                  <ListItemText
                    primary={procedure.title}
                    secondary={`期限：${getMonth(
                      new Date(procedure.deadline)
                    )}/${getDate(new Date(procedure.deadline))}`}
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </div>
        </Grid>
        <Grid item xs={2} md={2} lg={2} xl={2} className={classes.container}>
          <Typography variant="h6" className={classes.title}>
            3週間前まで
          </Typography>
          <div className={classes.demo}>
            <List dense={false}>
              {shapedProcedures.weekSixProcedures.map((procedure) => (
                <ListItem key={procedure.title}>
                  <ListItemText
                    primary={procedure.title}
                    secondary={`期限：${getMonth(
                      new Date(procedure.deadline)
                    )}/${getDate(new Date(procedure.deadline))}`}
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </div>
        </Grid>
        <Grid item xs={2} md={2} lg={2} xl={2} className={classes.container}>
          <Typography variant="h6" className={classes.title}>
            2週間前まで
          </Typography>
          <div className={classes.demo}>
            <List dense={false}>
              {shapedProcedures.weekSevenProcedures.map((procedure) => (
                <ListItem key={procedure.title}>
                  <ListItemText
                    primary={procedure.title}
                    secondary={`期限：${getMonth(
                      new Date(procedure.deadline)
                    )}/${getDate(new Date(procedure.deadline))}`}
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </div>
        </Grid>
        <Grid item xs={2} md={2} lg={2} xl={2} className={classes.container}>
          <Typography variant="h6" className={classes.title}>
            1週間前まで
          </Typography>
          <div className={classes.demo}>
            <List dense={false}>
              {shapedProcedures.weekEightProcedures.map((procedure) => (
                <ListItem key={procedure.title}>
                  <ListItemText
                    primary={procedure.title}
                    secondary={`期限：${getMonth(
                      new Date(procedure.deadline)
                    )}/${getDate(new Date(procedure.deadline))}`}
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </div>
        </Grid>
        <Grid item xs={2} md={2} lg={2} xl={2} className={classes.container}>
          <Typography variant="h6" className={classes.title}>
            当日まで
          </Typography>
          <div className={classes.demo}>
            <List dense={false}>
              {shapedProcedures.weekNineProcedures.map((procedure) => (
                <ListItem key={procedure.title}>
                  <ListItemText
                    primary={procedure.title}
                    secondary={`期限：${getMonth(
                      new Date(procedure.deadline)
                    )}/${getDate(new Date(procedure.deadline))}`}
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </div>
        </Grid>
        <Grid item xs={2} md={2} lg={2} xl={2} className={classes.container}>
          <Typography variant="h6" className={classes.title}>
            1週間後まで
          </Typography>
          <div className={classes.demo}>
            <List dense={false}>
              {shapedProcedures.weekTenProcedures.map((procedure) => (
                <ListItem key={procedure.title}>
                  <ListItemText
                    primary={procedure.title}
                    secondary={`期限：${getMonth(
                      new Date(procedure.deadline)
                    )}/${getDate(new Date(procedure.deadline))}`}
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </div>
        </Grid>
        <Grid item xs={2} md={2} lg={2} xl={2} className={classes.container}>
          <Typography variant="h6" className={classes.title}>
            2週間後まで
          </Typography>
          <div className={classes.demo}>
            <List dense={false}>
              {shapedProcedures.weekElevenProcedures.map((procedure) => (
                <ListItem key={procedure.title}>
                  <ListItemText
                    primary={procedure.title}
                    secondary={`期限：${getMonth(
                      new Date(procedure.deadline)
                    )}/${getDate(new Date(procedure.deadline))}`}
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </div>
        </Grid>
        <Grid item xs={2} md={2} lg={2} xl={2} className={classes.container}>
          <Typography variant="h6" className={classes.title}>
            3週間後まで
          </Typography>
          <div className={classes.demo}>
            <List dense={false}>
              {shapedProcedures.weekTwelveProcedures.map((procedure) => (
                <ListItem key={procedure.title}>
                  <ListItemText
                    primary={procedure.title}
                    secondary={`期限：${getMonth(
                      new Date(procedure.deadline)
                    )}/${getDate(new Date(procedure.deadline))}`}
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
