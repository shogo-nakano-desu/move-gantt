import React from "react";
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

import { auth } from "../../firebase";
import { dateGenerator } from "../utils/dateGenerator";

type LinkMenuItemProps = Omit<
  MenuItemProps<"a", { href: string }>,
  "component" | "button"
>;

const LinkMenuItem = React.forwardRef<HTMLAnchorElement, LinkMenuItemProps>(
  function LinkMenuItem(props, forwardedRef) {
    const { href, ...other } = props;
    return (
      <Link href={href}>
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

export default function MenuAppBar() {
  const router = useRouter();
  const classes = useStyles();
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

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
  const SignOut = async () => {
    try {
      await auth.signOut();
      router.push("/sign-in");
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div className={classes.root}>
      <AppBar className={classes.colorPrimary} position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {`${dateGenerator().year}/${dateGenerator().month}/${
              dateGenerator().date
            }(引越しまであとN日って出したい)`}
          </Typography>
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
              <LinkMenuItem href="/profile">プロフィール</LinkMenuItem>
              <LinkMenuItem href="/forms/form">
                新規プロジェクト作成
              </LinkMenuItem>
              {/* モーダルを出して、ログアウトさせるようにしよう */}
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
                  <form onSubmit={SignOut}>
                    <Button type="submit" color="primary" autoFocus>
                      はい
                    </Button>
                  </form>
                </DialogActions>
              </Dialog>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
