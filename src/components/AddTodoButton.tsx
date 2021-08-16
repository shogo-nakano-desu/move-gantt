// [TODO] ダイアログからTODOを追加できるようにする必要あり

import React from "react";
import AddTaskIcon from "@material-ui/icons/AddTask";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DatePickers from "./Datepickers";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

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

export default function AddTodoButtonComponent() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
        <form>
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
              fullWidth
            />
            <span className={classes.root}>
              <TextField
                margin="dense"
                type="date"
                label="開始日"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                margin="dense"
                type="date"
                label="終了日"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </span>
            <TextField
              margin="dense"
              type="text"
              label="詳細メモ"
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Subscribe
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
