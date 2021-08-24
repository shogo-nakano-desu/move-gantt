import React, { useState, useContext } from "react";
import { useSelector } from "react-redux";
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
import { db } from "../../firebaseClient";
import { stateType } from "../utils/reducers";
import { AuthContext } from "../utils/authProvider";

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
  const [deadline, setDeadline] = useState<undefined | Date>(undefined);
  const [memo, setMemo] = useState("");

  const currentUser = useContext(AuthContext);
  const userId = currentUser.currentUser!.uid;
  const projectId = useSelector((state: stateType) => state.project.projectId);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const putTodoToFirestore = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await db
      .collection("users")
      .doc(userId)
      .collection("projects")
      .doc(projectId)
      .collection("todos")
      .add({
        title: title,
        startDate: startDate!.getTime(),
        deadline: deadline!.getTime(),
        submitDestination: "",
        targetPerson: "everyone",
        confirmationSource: "",
        memo: memo,
        complete: false,
        isNotEmployee: false,
        isStudent: false,
        isPet: false,
        isScooter: false,
        isCar: false,
        isParking: false,
        isUnderFifteen: false,
        isFireInsurance: false,
        isFixedPhone: false,
        isMynumber: false,
        isStampRegistration: false,
        isDrivingLicense: false,
        created_at: Date.now(),
      })
      .then(() => {
        setOpen(false);
        setTitle("");
        setStartDate(undefined);
        setDeadline(undefined);
        setMemo("");
      })
      .catch((err) => {
        console.error(err);
      });
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
                  setDeadline(dateParser(e.target.value));
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
