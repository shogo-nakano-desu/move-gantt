import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import firebase from "firebase";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { splittedProcedures } from "../utils/splitProcedures";
import { TARGET_PERSON } from "../info/procedures";
import { auth, db } from "../../firebaseClient";
import {
  listenProcedures,
  stateType,
  isEditTodoOpen,
  setTodoId,
} from "../utils/reducers";
import { OneWeekTodosComponent } from "./OneWeekTodos";

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

export default function TodosComponent(props: Props) {
  const dispatch = useDispatch();

  // const userId = useSelector((state: stateType) => state.user.uid);
  const procedures = useSelector((state: stateType) => state.procedures);
  const open = useSelector((state: stateType) => state.editTodo.isOpen);
  const todoId = useSelector((state: stateType) => state.editTodo.todoId);
  const todoTitle = useSelector((state: stateType) => state.editTodo.todoTitle);

  const handleClose = () => {
    dispatch(isEditTodoOpen(false));
  };
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
      .onSnapshot({ includeMetadataChanges: true }, (snapshot) => {
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

  // [TODO]削除ボタンではモーダルを出して、そこでOKを押したら以下関数が呼ばれるようにする
  const deleteTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault;
    await db
      .collection("users")
      .doc(props.userId)
      .collection("projects")
      .doc(props.projectId)
      .collection("todos")
      .doc(todoId)
      .delete()
      .then(() => console.log("delete a todo"))
      .then(() => dispatch(setTodoId("")))
      .then(() => handleClose())
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <form onSubmit={deleteTodo}>
          <DialogTitle id="alert-dialog-title">
            {`「${todoTitle}」をTODOから削除してよろしいでしょうか？`}
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              戻る
            </Button>
            <Button
              type="submit"
              // onClick={handleClose}
              color="primary"
              autoFocus
            >
              削除する
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <OneWeekTodosComponent
        title={[
          "1か月以上前まで",
          "3週間前まで",
          "2週間前まで",
          "1週間前まで",
          "当日まで",
          "1週間後まで",
          "2週間後まで",
          "3週間後まで",
        ]}
        userId={props.userId}
        projectId={props.projectId}
      />
    </>
  );
}
