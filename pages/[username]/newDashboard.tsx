// 実装する必要があること

// import React from "react";
// import useRef from "react-dom";
// import { Container } from "@material-ui/core";

// const NewDashboard = () => {
//   // Refでエレメントにアクセスできるようにしておいて、TODOごとにどのElに入るべきかを決めるようにする
//   const firstWeekEl = useRef(null);
//   const secondWeekEl = useRef(null);
//   const thirdWeekEl = useRef(null);
//   const fourthWeekEl = useRef(null);
//   const fifthWeekEl = useRef(null);
//   const sixthWeekEl = useRef(null);
//   const seventhWeekEl = useRef(null);
//   const eighthWeekEl = useRef(null);
//   const ninthWeekEl = useRef(null);

//   return (
//     <>
//       <Container maxWidth="sm">
//         <div></div>
//       </Container>
//     </>
//   );
// };
import React, { useRef } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";

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

function generate(element: React.ReactElement) {
  return [0, 1, 2, 3].map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
}

// あとは中にデータ入れれば完成
export default function InteractiveList() {
  const classes = useStyles();
  const firstTitleRef = useRef<HTMLDivElement>(null);

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={2} md={2} lg={2} xl={2} className={classes.container}>
          <Typography variant="h6" className={classes.title}>
            Week1
          </Typography>
          <div className={classes.demo}>
            <List dense={false}>
              {generate(
                <ListItem>
                  <ListItemText primary="Title" secondary={"Deadline"} />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              )}
            </List>
          </div>
        </Grid>
        <Grid item xs={2} md={2} lg={2} xl={2} className={classes.container}>
          <Typography variant="h6" className={classes.title}>
            Week2
          </Typography>
          <div className={classes.demo}>
            <List dense={false}>
              {generate(
                <ListItem>
                  <ListItemText primary="Title" secondary={"Deadline"} />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              )}
            </List>
          </div>
        </Grid>
        <Grid item xs={2} md={2} lg={2} xl={2} className={classes.container}>
          <Typography variant="h6" className={classes.title}>
            Week3
          </Typography>
          <div className={classes.demo}>
            <List dense={false}>
              {generate(
                <ListItem>
                  <ListItemText primary="Title" secondary={"Deadline"} />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              )}
            </List>
          </div>
        </Grid>
        <Grid item xs={2} md={2} lg={2} xl={2} className={classes.container}>
          <Typography variant="h6" className={classes.title}>
            Week4
          </Typography>
          <div className={classes.demo}>
            <List dense={false}>
              {generate(
                <ListItem>
                  <ListItemText primary="Title" secondary={"Deadline"} />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              )}
            </List>
          </div>
        </Grid>
        <Grid item xs={2} md={2} lg={2} xl={2} className={classes.container}>
          <Typography variant="h6" className={classes.title}>
            Week5
          </Typography>
          <div className={classes.demo}>
            <List dense={false}>
              {generate(
                <ListItem>
                  <ListItemText primary="Title" secondary={"Deadline"} />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              )}
            </List>
          </div>
        </Grid>
        <Grid item xs={2} md={2} lg={2} xl={2} className={classes.container}>
          <Typography variant="h6" className={classes.title}>
            Week6
          </Typography>
          <div className={classes.demo}>
            <List dense={false}>
              {generate(
                <ListItem>
                  <ListItemText primary="Title" secondary={"Deadline"} />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              )}
            </List>
          </div>
        </Grid>
        <Grid item xs={2} md={2} lg={2} xl={2} className={classes.container}>
          <Typography variant="h6" className={classes.title}>
            Week7
          </Typography>
          <div className={classes.demo}>
            <List dense={false}>
              {generate(
                <ListItem>
                  <ListItemText primary="Title" secondary={"Deadline"} />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              )}
            </List>
          </div>
        </Grid>
        <Grid item xs={2} md={2} lg={2} xl={2} className={classes.container}>
          <Typography variant="h6" className={classes.title}>
            Week8
          </Typography>
          <div className={classes.demo}>
            <List dense={false}>
              {generate(
                <ListItem>
                  <ListItemText primary="Title" secondary={"Deadline"} />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              )}
            </List>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
