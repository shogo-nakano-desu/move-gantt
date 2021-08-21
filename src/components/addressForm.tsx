import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "firebase/firestore";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";

import {
  willMovePrefectureForm,
  willMoveAddressForm,
  moveFromPrefectureForm,
  moveFromAddressForm,
  stateType,
} from "../utils/reducers";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    buttons: {
      display: "flex",
      justifyContent: "flex-end",
    },
    button: {
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(1),
    },
  })
);
export default function AddressFormComponent() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const willMovePrefecture = useSelector(
    (state: stateType) => state.projectForm.formWillMovePrefecture
  );
  const willMoveAddress = useSelector(
    (state: stateType) => state.projectForm.formWillMoveAddress
  );
  const moveFromPrefecture = useSelector(
    (state: stateType) => state.projectForm.formMoveFromPrefecture
  );
  const moveFromAddress = useSelector(
    (state: stateType) => state.projectForm.formMoveFromAddress
  );

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        引越し先住所
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <FormControl required className={classes.formControl}>
            <InputLabel id="required-prefecture">都道府県</InputLabel>
            <Select
              labelId="required-prefecture"
              id="required-prefecture-selector"
              value={willMovePrefecture}
              onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                dispatch(willMovePrefectureForm(event.target.value as string));
              }}
              className={classes.selectEmpty}
            >
              <MenuItem value={"北海道"}>北海道</MenuItem>
              <MenuItem value={"青森県"}>青森県</MenuItem>
              <MenuItem value={"岩手県"}>岩手県</MenuItem>
              <MenuItem value={"宮城県"}>宮城県</MenuItem>
              <MenuItem value={"秋田県"}>秋田県</MenuItem>
              <MenuItem value={"山形県"}>山形県</MenuItem>
              <MenuItem value={"福島県"}>福島県</MenuItem>
              <MenuItem value={"茨城県"}>茨城県</MenuItem>
              <MenuItem value={"栃木県"}>栃木県</MenuItem>
              <MenuItem value={"群馬県"}>群馬県</MenuItem>
              <MenuItem value={"埼玉県"}>埼玉県</MenuItem>
              <MenuItem value={"千葉県"}>千葉県</MenuItem>
              <MenuItem value={"東京都"}>東京都</MenuItem>
              <MenuItem value={"神奈川県"}>神奈川県</MenuItem>
              <MenuItem value={"新潟県"}>新潟県</MenuItem>
              <MenuItem value={"富山県"}>富山県</MenuItem>
              <MenuItem value={"石川県"}>石川県</MenuItem>
              <MenuItem value={"福井県"}>福井県</MenuItem>
              <MenuItem value={"山梨県"}>山梨県</MenuItem>
              <MenuItem value={"長野県"}>長野県</MenuItem>
              <MenuItem value={"岐阜県"}>岐阜県</MenuItem>
              <MenuItem value={"静岡県"}>静岡県</MenuItem>
              <MenuItem value={"愛知県"}>愛知県</MenuItem>
              <MenuItem value={"三重県"}>三重県</MenuItem>
              <MenuItem value={"滋賀県"}>滋賀県</MenuItem>
              <MenuItem value={"京都府"}>京都府</MenuItem>
              <MenuItem value={"大阪府"}>大阪府</MenuItem>
              <MenuItem value={"兵庫県"}>兵庫県</MenuItem>
              <MenuItem value={"奈良県"}>奈良県</MenuItem>
              <MenuItem value={"和歌山県"}>和歌山県</MenuItem>
              <MenuItem value={"鳥取県"}>鳥取県</MenuItem>
              <MenuItem value={"島根県"}>島根県</MenuItem>
              <MenuItem value={"岡山県"}>岡山県</MenuItem>
              <MenuItem value={"広島県"}>広島県</MenuItem>
              <MenuItem value={"山口県"}>山口県</MenuItem>
              <MenuItem value={"徳島県"}>徳島県</MenuItem>
              <MenuItem value={"香川県"}>香川県</MenuItem>
              <MenuItem value={"愛媛県"}>愛媛県</MenuItem>
              <MenuItem value={"高知県"}>高知県</MenuItem>
              <MenuItem value={"福岡県"}>福岡県</MenuItem>
              <MenuItem value={"佐賀県"}>佐賀県</MenuItem>
              <MenuItem value={"長崎県"}>長崎県</MenuItem>
              <MenuItem value={"熊本県"}>熊本県</MenuItem>
              <MenuItem value={"大分県"}>大分県</MenuItem>
              <MenuItem value={"宮崎県"}>宮崎県</MenuItem>
              <MenuItem value={"鹿児島県"}>鹿児島県</MenuItem>
              <MenuItem value={"沖縄県"}>沖縄県</MenuItem>
            </Select>
            <FormHelperText>必須項目</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="municipalities"
            name="municipalities"
            label="市区町村"
            fullWidth
            autoComplete="address-level2"
            value={willMoveAddress}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              dispatch(willMoveAddressForm(e.target.value));
            }}
          />
        </Grid>
      </Grid>
      <Typography variant="h6" gutterBottom>
        引越し元住所
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <FormControl required className={classes.formControl}>
            <InputLabel id="required-prefecture">都道府県</InputLabel>
            <Select
              labelId="required-prefecture"
              id="required-prefecture-selector"
              value={moveFromPrefecture}
              onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                dispatch(moveFromPrefectureForm(event.target.value as string));
              }}
              className={classes.selectEmpty}
            >
              <MenuItem value={"北海道"}>北海道</MenuItem>
              <MenuItem value={"青森県"}>青森県</MenuItem>
              <MenuItem value={"岩手県"}>岩手県</MenuItem>
              <MenuItem value={"宮城県"}>宮城県</MenuItem>
              <MenuItem value={"秋田県"}>秋田県</MenuItem>
              <MenuItem value={"山形県"}>山形県</MenuItem>
              <MenuItem value={"福島県"}>福島県</MenuItem>
              <MenuItem value={"茨城県"}>茨城県</MenuItem>
              <MenuItem value={"栃木県"}>栃木県</MenuItem>
              <MenuItem value={"群馬県"}>群馬県</MenuItem>
              <MenuItem value={"埼玉県"}>埼玉県</MenuItem>
              <MenuItem value={"千葉県"}>千葉県</MenuItem>
              <MenuItem value={"東京都"}>東京都</MenuItem>
              <MenuItem value={"神奈川県"}>神奈川県</MenuItem>
              <MenuItem value={"新潟県"}>新潟県</MenuItem>
              <MenuItem value={"富山県"}>富山県</MenuItem>
              <MenuItem value={"石川県"}>石川県</MenuItem>
              <MenuItem value={"福井県"}>福井県</MenuItem>
              <MenuItem value={"山梨県"}>山梨県</MenuItem>
              <MenuItem value={"長野県"}>長野県</MenuItem>
              <MenuItem value={"岐阜県"}>岐阜県</MenuItem>
              <MenuItem value={"静岡県"}>静岡県</MenuItem>
              <MenuItem value={"愛知県"}>愛知県</MenuItem>
              <MenuItem value={"三重県"}>三重県</MenuItem>
              <MenuItem value={"滋賀県"}>滋賀県</MenuItem>
              <MenuItem value={"京都府"}>京都府</MenuItem>
              <MenuItem value={"大阪府"}>大阪府</MenuItem>
              <MenuItem value={"兵庫県"}>兵庫県</MenuItem>
              <MenuItem value={"奈良県"}>奈良県</MenuItem>
              <MenuItem value={"和歌山県"}>和歌山県</MenuItem>
              <MenuItem value={"鳥取県"}>鳥取県</MenuItem>
              <MenuItem value={"島根県"}>島根県</MenuItem>
              <MenuItem value={"岡山県"}>岡山県</MenuItem>
              <MenuItem value={"広島県"}>広島県</MenuItem>
              <MenuItem value={"山口県"}>山口県</MenuItem>
              <MenuItem value={"徳島県"}>徳島県</MenuItem>
              <MenuItem value={"香川県"}>香川県</MenuItem>
              <MenuItem value={"愛媛県"}>愛媛県</MenuItem>
              <MenuItem value={"高知県"}>高知県</MenuItem>
              <MenuItem value={"福岡県"}>福岡県</MenuItem>
              <MenuItem value={"佐賀県"}>佐賀県</MenuItem>
              <MenuItem value={"長崎県"}>長崎県</MenuItem>
              <MenuItem value={"熊本県"}>熊本県</MenuItem>
              <MenuItem value={"大分県"}>大分県</MenuItem>
              <MenuItem value={"宮崎県"}>宮崎県</MenuItem>
              <MenuItem value={"鹿児島県"}>鹿児島県</MenuItem>
              <MenuItem value={"沖縄県"}>沖縄県</MenuItem>
            </Select>
            <FormHelperText>必須項目</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="municipalities"
            name="municipalities"
            label="市区町村"
            fullWidth
            autoComplete="address-level2"
            value={moveFromAddress}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              dispatch(moveFromAddressForm(e.target.value));
            }}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
