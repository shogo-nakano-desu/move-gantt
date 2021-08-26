import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getMonth, getDate } from "date-fns";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

import { db } from "../../firebaseClient";
import {
  listenProcedures,
  stateType,
  isDeleteTodoOpen,
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
  const detailStartDate = useSelector(
    (state: stateType) => state.todoDetail.startDate
  );
  const detailDeadline = useSelector(
    (state: stateType) => state.todoDetail.deadline
  );
  const detailSubmitDestination = useSelector(
    (state: stateType) => state.todoDetail.submitDestination
  );
  const detailConfirmationSource = useSelector(
    (state: stateType) => state.todoDetail.confirmationSource
  );
  const detailMemo = useSelector((state: stateType) => state.todoDetail.memo);

  const handleClose = () => {
    dispatch(isDeleteTodoOpen(false));
  };

  const handleDetailClose = () => {
    dispatch(isDetailOpen(false));
  };

  useEffect(() => {
    console.log("Todos.tsx props.userId", props.userId);
    console.log("props.projectId", props.projectId);
    // const unSub = () => console.log("Todos subscribe start");
    const unSub = db
      .collection("users")
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
  }, [props.projectId, dispatch]); //[TODO][props.projectId, props.userId, dispatch]が元

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
  const urlRegex = new RegExp("^http");

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
          {`TODO：${detailTitle}`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="detail-dialog-startDate">
            {`開始日：${getMonth(new Date(detailStartDate))}/${getDate(
              new Date(detailStartDate)
            )}`}
          </DialogContentText>
        </DialogContent>
        <DialogContent>
          <DialogContentText id="detail-dialog-deadline">
            {`期限：${getMonth(new Date(detailDeadline))}/${getDate(
              new Date(detailDeadline)
            )}`}
          </DialogContentText>
        </DialogContent>
        <DialogContent>
          <DialogContentText id="detail-dialog-submitDestination">
            {`対応場所：${detailSubmitDestination}`}
          </DialogContentText>
        </DialogContent>
        <DialogContent>
          {/* URLだった時だけリンクにする */}
          {urlRegex.test(detailConfirmationSource) ? (
            <DialogContentText id="detail-dialog-confirmationSource">
              確認先：
              <a href={detailConfirmationSource}>
                {`${detailConfirmationSource}`}
              </a>
            </DialogContentText>
          ) : (
            <DialogContentText id="detail-dialog-confirmationSource">
              {`確認先：${detailConfirmationSource}`}
            </DialogContentText>
          )}
        </DialogContent>
        <DialogContent>
          <DialogContentText id="detail-dialog-memo">
            {`メモ：${detailMemo}`}
          </DialogContentText>
        </DialogContent>
      </Dialog>

      <OneWeekTodosComponent
        title={[
          "4週間以上前",
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
