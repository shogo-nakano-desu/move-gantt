import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

import { db } from "../../firebaseClient";
import {
  listenProcedures,
  stateType,
  isEditTodoOpen,
  isDetailOpen,
  setTodoId,
} from "../utils/reducers";
import { converter } from "../utils/firestoreTypeGuard";
import { OneWeekTodosComponent } from "./OneWeekTodos";

interface Props {
  userId: string;
  projectId: string;
}

export default function TodosComponent(props: Props) {
  const dispatch = useDispatch();

  const open = useSelector((state: stateType) => state.editTodo.isOpen);
  const detailOpen = useSelector(
    (state: stateType) => state.todoDetail.isDetailOpen
  );
  const todoId = useSelector((state: stateType) => state.editTodo.todoId);
  const todoTitle = useSelector((state: stateType) => state.editTodo.todoTitle);

  const detailTitle = useSelector((state: stateType) => state.todoDetail.title);

  const handleClose = () => {
    dispatch(isEditTodoOpen(false));
  };

  const handleDetailClose = () => {
    dispatch(isDetailOpen(false));
  };

  useEffect(() => {
    console.log("Todos.tsx props.userId", props.userId);
    console.log("props.projectId", props.projectId);
    const unSub = () => console.log("Todos subscribe start");
    db.collection("users")
      .doc(props.userId)
      .collection("projects")
      .doc(props.projectId)
      .collection("todos")
      .withConverter(converter)
      .orderBy("deadline", "asc")
      .orderBy("startDate", "asc")
      .onSnapshot(
        { includeMetadataChanges: true },
        (snapshot) => {
          dispatch(
            listenProcedures(
              snapshot.docs.map((doc) => ({
                id: doc.id,
                title: doc.data().title,
                startDate: doc.data().startDate, // プロジェクト作成日か関数で計算した日付
                deadline: doc.data().deadline,
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
                created_at: doc.data().created_at,
              }))
            )
          );
        },
        (error) => {
          console.error(error);
        }
      );
    return () => {
      unSub();
    };
  }, [props.projectId, props.userId, dispatch]); //props.projectIdが入っていた。

  const deleteTodo = () => {
    db.collection("users")
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
        <DialogTitle id="alert-dialog-title">
          {`「${todoTitle}」をTODOから削除してよろしいでしょうか？`}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            戻る
          </Button>
          <Button onClick={deleteTodo} color="primary" autoFocus>
            削除する
          </Button>
        </DialogActions>
      </Dialog>

      {/* この中に詳細を表示するダイアログを作る */}
      <Dialog
        open={detailOpen}
        onClose={handleDetailClose}
        aria-labelledby="detail-dialog-title"
        aria-describedby="detail-dialog-description"
      >
        <DialogTitle id="detail-dialog-title">
          {`TODO : ${detailTitle}`}
        </DialogTitle>
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
          "2週間後以降",
        ]}
        userId={props.userId}
        projectId={props.projectId}
      />
    </>
  );
}
