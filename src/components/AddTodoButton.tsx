// [TODO] ダイアログからTODOを追加できるようにする必要あり
import React, { useState } from "react";
import { useSelector } from "react-redux";
import firebase from "firebase/app";
import AddTaskIcon from "@material-ui/icons/AddTask";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import { dateParser } from "../utils/dateParser";
import { auth, db } from "../../firebaseClient";
import { stateType } from "../utils/reducers";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
      backgroundColor: "rgb(56,162,185)",
      "&:hover": {
        backgroundColor: "rgb(110,162,185)",
      },
    },
    root: {
      "& .MuiTextField-root": {
        marginRight: theme.spacing(1),
        width: "25ch",
      },
    },
  })
);

// ホバーした際にbackgroundColorを100,162,185にしたい
interface Props {
  onChange?: (date: Date) => void;
}

export default function AddTodoButtonComponent({ onChange }: Props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState<undefined | Date>(undefined);
  const [endDate, setEndDate] = useState<undefined | Date>(undefined);
  const [memo, setMemo] = useState("");

  const userId = useSelector((state: stateType) => state.user.uid);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const putTodoToFirestore = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    db.collection("users")
      .doc(userId)
      .collection("projects")
      .doc("5GsdMBBOJNrFjLSYusYI") //[TODO]仮に適当なプロジェクトに突っ込んでみる
      .collection("todos")
      .add({
        title: title,
        startDate: startDate,
        endDate: endDate,
        memo: memo,
        created_at: firebase.firestore.FieldValue.serverTimestamp(),
      });
    setOpen(false);
    setTitle("");
    setStartDate(undefined);
    setEndDate(undefined);
    setMemo("");
  };
  return (
    <>
      <Button
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
        startIcon={<AddTaskIcon />}
        onClick={handleClickOpen}
      >
        TODOを追加する
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        {/* このフォームに対して、onSubmitプロパティを追加する。DBにサブミットする関数は別で書く */}
        <form onSubmit={putTodoToFirestore}>
          <DialogTitle id="form-dialog-title">TODOを追加する</DialogTitle>
          <DialogContent>
            <DialogContentText>
              引越しに必要なTODOで、まだ登録できていないものがあれば忘れないうちに登録しましょう！
              <br />
              （例：ベッドを買い替える。など）
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="タイトル"
              type="text"
              value={title}
              fullWidth
              required
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setTitle(e.target.value);
              }}
            />
            <span className={classes.root}>
              <TextField
                margin="dense"
                type="date"
                label="開始日"
                required
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setStartDate(dateParser(e.target.value));
                }}
              />
              <TextField
                margin="dense"
                type="date"
                label="終了日"
                required
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setEndDate(dateParser(e.target.value));
                }}
              />
            </span>
            <TextField
              margin="dense"
              type="text"
              label="詳細メモ"
              value={memo}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setMemo(e.target.value);
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              キャンセル
            </Button>
            <Button type="submit" color="primary">
              追加
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
