import React from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { MenuItem, Menu, MenuItemProps } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

import { auth } from "../../firebaseClient";
import { dateGenerator } from "../utils/dateGenerator";
import { stateType } from "../utils/reducers";

type LinkMenuItemProps = Omit<
  MenuItemProps<"a", { href: string }>,
  "component" | "button"
>;

const LinkMenuItem = React.forwardRef<HTMLAnchorElement, LinkMenuItemProps>(
  function LinkMenuItem(props, forwardedRef) {
    const { href, ...other } = props;
    return (
      <Link href={href} passHref>
        <MenuItem component="a" button ref={forwardedRef} {...other} />
      </Link>
    );
  }
);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    colorPrimary: {
      backgroundColor: "rgb(17, 30, 51)",
    },
    title: {
      flexGrow: 1,
    },
  })
);

export default function AppBarComponent() {
  const router = useRouter();
  const classes = useStyles();
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const moveDate = useSelector((state: stateType) => state.project.moveDate);
  const moveFrom = useSelector((state: stateType) => state.project.moveFrom);
  const moveTo = useSelector((state: stateType) => state.project.moveTo);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  // SignOut
  const SignOut = () => {
    try {
      router.push("/sign-out");
      // await auth.signOut().catch((err) => console.error(err)); //[TODO]サインアウとしてからsign-inページにプッシュされるので、一瞬dashboardに戻ることになって落ちてしまう
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.colorPrimary} position="static">
        <Toolbar>
          {moveDate ? (
            <Typography variant="h6" className={classes.title}>
              {`引越し予定日：${dateGenerator(moveDate).year}/${
                dateGenerator(moveDate).month
              }/${dateGenerator(moveDate).date}`}
            </Typography>
          ) : (
            <Typography variant="h6" className={classes.title}>
              {`本日：${dateGenerator(Date.now()).year}/${
                dateGenerator(Date.now()).month
              }/${dateGenerator(Date.now()).date}`}
            </Typography>
          )}
          {moveFrom && moveTo && (
            <Typography variant="h6" className={classes.title}>
              {`${moveFrom}⇨${moveTo}`}
            </Typography>
          )}

          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              onClose={handleClose}
            >
              <LinkMenuItem href="/dashboard">
                プロフィール(工事中)
              </LinkMenuItem>
              <LinkMenuItem href="/new-project">
                新規プロジェクト作成
              </LinkMenuItem>
              <LinkMenuItem href="/chose-project">
                管理する〜（工事中）
              </LinkMenuItem>
              <MenuItem onClick={handleDialogOpen}>ログアウト</MenuItem>
              <Dialog
                open={dialogOpen}
                onClose={handleDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"ログアウトしてもよろしいでしょうか？"}
                </DialogTitle>

                <DialogActions>
                  <Button onClick={handleDialogClose} color="primary">
                    いいえ
                  </Button>

                  <Button onClick={SignOut} color="primary" autoFocus>
                    はい
                  </Button>
                </DialogActions>
              </Dialog>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
