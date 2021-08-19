import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import {
  isNotEmployeeForm,
  isStudentForm,
  isPetForm,
  isScooterForm,
  isCarForm,
  isUnderFifteenForm,
  isFireInsuranceForm,
  isFixedPhoneForm,
  isMynumberForm,
  isStampRegistrationForm,
  isDrivingLicenseForm,
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
    (state: stateType) => state.projectForm.formIsNotEmployee
  );
  const isStudent = useSelector(
    (state: stateType) => state.projectForm.formIsStudent
  );
  const isPet = useSelector((state: stateType) => state.projectForm.formIsPet);
  const isScooter = useSelector(
    (state: stateType) => state.projectForm.formIsScooter
  );
  const isCar = useSelector((state: stateType) => state.projectForm.formIsCar);
  const isUnderFifteen = useSelector(
    (state: stateType) => state.projectForm.formIsUnderFifteen
  );
  const isFireInsurance = useSelector(
    (state: stateType) => state.projectForm.formIsFireInsurance
  );
  const isFixedPhone = useSelector(
    (state: stateType) => state.projectForm.formIsFixedPhone
  );
  const isMynumber = useSelector(
    (state: stateType) => state.projectForm.formIsMynumber
  );
  const isStampRegistration = useSelector(
    (state: stateType) => state.projectForm.formIsStampRegistration
  );
  const isDrivingLicense = useSelector(
    (state: stateType) => state.projectForm.formIsDrivingLicense
  );

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
                  dispatch(isNotEmployeeForm(event.target.checked));
                }}
                name="isSelfEmployed"
              />
            }
            label="会社員ではないでしょうか？"
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
          <FormControlLabel
            control={
              <Checkbox
                checked={isUnderFifteen}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  dispatch(isUnderFifteenForm(event.target.checked));
                }}
                name="isUnderFifteen"
              />
            }
            label="15歳以下の子供がいますか？"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isFireInsurance}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  dispatch(isFireInsuranceForm(event.target.checked));
                }}
                name="isFireInsurance"
              />
            }
            label="火災保険に加入していますか？"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isFixedPhone}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  dispatch(isFixedPhoneForm(event.target.checked));
                }}
                name="isFixedPhone"
              />
            }
            label="固定電話を保有していますか？"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isMynumber}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  dispatch(isMynumberForm(event.target.checked));
                }}
                name="isMynumber"
              />
            }
            label="マイナンバーカードを保有していますか？"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isStampRegistration}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  dispatch(isStampRegistrationForm(event.target.checked));
                }}
                name="isStampRegistration"
              />
            }
            label="印鑑登録をしていますか？"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isDrivingLicense}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  dispatch(isDrivingLicenseForm(event.target.checked));
                }}
                name="isDrivingLicense"
              />
            }
            label="運転免許証を保有していますか？"
          />
        </FormGroup>
      </FormControl>
    </div>
  );
}
