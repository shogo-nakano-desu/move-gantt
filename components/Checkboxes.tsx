import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    formControl: {
      margin: theme.spacing(3),
    },
  })
);

export default function CheckboxesGroup() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    isSelfEmployed: true,
    isStudent: false,
    isPet: false,
    isScooter: false,
    isCar: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const { isSelfEmployed, isStudent, isPet, isScooter, isCar } = state;

  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">
          当てはまるものを全て選択してください
        </FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={isSelfEmployed}
                onChange={handleChange}
                name="isSelfEmployed"
              />
            }
            label="自営業を営んでいますか？"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isStudent}
                onChange={handleChange}
                name="isStudent"
              />
            }
            label="学生が同居していますか？"
          />
          <FormControlLabel
            control={
              <Checkbox checked={isPet} onChange={handleChange} name="isPet" />
            }
            label="ペットを飼っていますか？"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isScooter}
                onChange={handleChange}
                name="isScooter"
              />
            }
            label="原付を所有していますか？"
          />
          <FormControlLabel
            control={
              <Checkbox checked={isCar} onChange={handleChange} name="isCar" />
            }
            label="自家用車を保有していますか？"
          />
        </FormGroup>
      </FormControl>
    </div>
  );
}
