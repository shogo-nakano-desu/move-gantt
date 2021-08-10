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
import { getMonth, getDate } from "date-fns";
import { splitedProcedures } from "../utils/splitProcedures";

import { sortedProcedures } from "../utils/sortProcedures";

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
export default function TodosComponent() {
  const classes = useStyles();
  console.log(sortedProcedures);
  //const firstTitleRef = useRef<HTMLDivElement>(null);

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={2} md={2} lg={2} xl={2} className={classes.container}>
          <Typography variant="h6" className={classes.title}>
            Week1
          </Typography>
          <div className={classes.demo}>
            <List dense={false}>
              {splitedProcedures().weekOneProcedures.map((procedure) => (
                <ListItem key={procedure.title}>
                  <ListItemText
                    primary={procedure.title}
                    secondary={`期限：${getMonth(procedure.deadline)}/${getDate(
                      procedure.deadline
                    )}`}
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
            Week2
          </Typography>
          <div className={classes.demo}>
            <List dense={false}>
              {splitedProcedures().weekTwoProcedures.map((procedure) => (
                <ListItem key={procedure.title}>
                  <ListItemText
                    primary={procedure.title}
                    secondary={`期限：${getMonth(procedure.deadline)}/${getDate(
                      procedure.deadline
                    )}`}
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
            Week3
          </Typography>
          <div className={classes.demo}>
            <List dense={false}>
              {splitedProcedures().weekThreeProcedures.map((procedure) => (
                <ListItem key={procedure.title}>
                  <ListItemText
                    primary={procedure.title}
                    secondary={`期限：${getMonth(procedure.deadline)}/${getDate(
                      procedure.deadline
                    )}`}
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
            Week4
          </Typography>
          <div className={classes.demo}>
            <List dense={false}>
              {splitedProcedures().weekFourProcedures.map((procedure) => (
                <ListItem key={procedure.title}>
                  <ListItemText
                    primary={procedure.title}
                    secondary={`期限：${getMonth(procedure.deadline)}/${getDate(
                      procedure.deadline
                    )}`}
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
            Week5
          </Typography>
          <div className={classes.demo}>
            <List dense={false}>
              {splitedProcedures().weekFiveProcedures.map((procedure) => (
                <ListItem key={procedure.title}>
                  <ListItemText
                    primary={procedure.title}
                    secondary={`期限：${getMonth(procedure.deadline)}/${getDate(
                      procedure.deadline
                    )}`}
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
            Week6
          </Typography>
          <div className={classes.demo}>
            <List dense={false}>
              {splitedProcedures().weekSixProcedures.map((procedure) => (
                <ListItem key={procedure.title}>
                  <ListItemText
                    primary={procedure.title}
                    secondary={`期限：${getMonth(procedure.deadline)}/${getDate(
                      procedure.deadline
                    )}`}
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
            Week7
          </Typography>
          <div className={classes.demo}>
            <List dense={false}>
              {splitedProcedures().weekSevenProcedures.map((procedure) => (
                <ListItem key={procedure.title}>
                  <ListItemText
                    primary={procedure.title}
                    secondary={`期限：${getMonth(procedure.deadline)}/${getDate(
                      procedure.deadline
                    )}`}
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
            Week8
          </Typography>
          <div className={classes.demo}>
            <List dense={false}>
              {splitedProcedures().weekEightProcedures.map((procedure) => (
                <ListItem key={procedure.title}>
                  <ListItemText
                    primary={procedure.title}
                    secondary={`期限：${getMonth(procedure.deadline)}/${getDate(
                      procedure.deadline
                    )}`}
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
