import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import {
  isSelfEmployedForm,
  isStudentForm,
  isPetForm,
  isScooterForm,
  isCarForm,
  stateType,
} from "../utils/reducers";

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
  const dispatch = useDispatch();
  const isSelfEmployed = useSelector(
    (state: stateType) => state.projectForm.formIsSelfEmployed
  );
  const isStudent = useSelector(
    (state: stateType) => state.projectForm.formIsStudent
  );
  const isPet = useSelector((state: stateType) => state.projectForm.formIsPet);
  const isScooter = useSelector(
    (state: stateType) => state.projectForm.formIsScooter
  );
  const isCar = useSelector((state: stateType) => state.projectForm.formIsCar);

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
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  dispatch(isSelfEmployedForm(event.target.checked));
                }}
                name="isSelfEmployed"
              />
            }
            label="自営業を営んでいますか？"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isStudent}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  dispatch(isStudentForm(event.target.checked));
                }}
                name="isStudent"
              />
            }
            label="学生が同居していますか？"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isPet}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  dispatch(isPetForm(event.target.checked));
                }}
                name="isPet"
              />
            }
            label="ペットを飼っていますか？"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isScooter}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  dispatch(isScooterForm(event.target.checked));
                }}
                name="isScooter"
              />
            }
            label="原付を所有していますか？"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isCar}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  dispatch(isCarForm(event.target.checked));
                }}
                name="isCar"
              />
            }
            label="自家用車を保有していますか？"
          />
        </FormGroup>
      </FormControl>
    </div>
  );
}
