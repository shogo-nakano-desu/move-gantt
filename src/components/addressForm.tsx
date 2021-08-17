import React from "react";
import { useDispatch, useSelector } from "react-redux";
import firebase from "firebase/app";
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

import { db } from "../../firebaseClient";
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

  // const addProject = async () => {
  //   await db.collection("projects").add({
  //     UID: user.id,
  //     title: title,
  //     move_date: move_date,
  //     future_address: further_address,
  //     current_address: current_address,
  //   });
  // };
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
              <MenuItem value={"hokkaido"}>北海道</MenuItem>
              <MenuItem value={"aomori"}>青森県</MenuItem>
              <MenuItem value={"iwate"}>岩手県</MenuItem>
              <MenuItem value={"miyagi"}>宮城県</MenuItem>
              <MenuItem value={"akita"}>秋田県</MenuItem>
              <MenuItem value={"yamagata"}>山形県</MenuItem>
              <MenuItem value={"fukushima"}>福島県</MenuItem>
              <MenuItem value={"ibaraki"}>茨城県</MenuItem>
              <MenuItem value={"tochigi"}>栃木県</MenuItem>
              <MenuItem value={"gunma"}>群馬県</MenuItem>
              <MenuItem value={"saitama"}>埼玉県</MenuItem>
              <MenuItem value={"chiba"}>千葉県</MenuItem>
              <MenuItem value={"tokyo"}>東京都</MenuItem>
              <MenuItem value={"kanagawa"}>神奈川県</MenuItem>
              <MenuItem value={"niigata"}>新潟県</MenuItem>
              <MenuItem value={"toyama"}>富山県</MenuItem>
              <MenuItem value={"ishikawa"}>石川県</MenuItem>
              <MenuItem value={"fukui"}>福井県</MenuItem>
              <MenuItem value={"yamanashi"}>山梨県</MenuItem>
              <MenuItem value={"nagano"}>長野県</MenuItem>
              <MenuItem value={"gifu"}>岐阜県</MenuItem>
              <MenuItem value={"shizuoka"}>静岡県</MenuItem>
              <MenuItem value={"aichi"}>愛知県</MenuItem>
              <MenuItem value={"mie"}>三重県</MenuItem>
              <MenuItem value={"shiga"}>滋賀県</MenuItem>
              <MenuItem value={"kyoto"}>京都府</MenuItem>
              <MenuItem value={"osaka"}>大阪府</MenuItem>
              <MenuItem value={"hyogo"}>兵庫県</MenuItem>
              <MenuItem value={"nara"}>奈良県</MenuItem>
              <MenuItem value={"wakayama"}>和歌山県</MenuItem>
              <MenuItem value={"tottori"}>鳥取県</MenuItem>
              <MenuItem value={"shimane"}>島根県</MenuItem>
              <MenuItem value={"okayama"}>岡山県</MenuItem>
              <MenuItem value={"hiroshima"}>広島県</MenuItem>
              <MenuItem value={"yamaguchi"}>山口県</MenuItem>
              <MenuItem value={"tokushima"}>徳島県</MenuItem>
              <MenuItem value={"kagawa"}>香川県</MenuItem>
              <MenuItem value={"ehime"}>愛媛県</MenuItem>
              <MenuItem value={"kochi"}>高知県</MenuItem>
              <MenuItem value={"fukuoka"}>福岡県</MenuItem>
              <MenuItem value={"saga"}>佐賀県</MenuItem>
              <MenuItem value={"nagasaki"}>長崎県</MenuItem>
              <MenuItem value={"kumamoto"}>熊本県</MenuItem>
              <MenuItem value={"oita"}>大分県</MenuItem>
              <MenuItem value={"miyazaki"}>宮崎県</MenuItem>
              <MenuItem value={"kagoshima"}>鹿児島県</MenuItem>
              <MenuItem value={"okinawa"}>沖縄県</MenuItem>
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
                  dispatch(
                    moveFromPrefectureForm(event.target.value as string)
                  );
                }}
                className={classes.selectEmpty}
              >
                <MenuItem value={"hokkaido"}>北海道</MenuItem>
                <MenuItem value={"aomori"}>青森県</MenuItem>
                <MenuItem value={"iwate"}>岩手県</MenuItem>
                <MenuItem value={"miyagi"}>宮城県</MenuItem>
                <MenuItem value={"akita"}>秋田県</MenuItem>
                <MenuItem value={"yamagata"}>山形県</MenuItem>
                <MenuItem value={"fukushima"}>福島県</MenuItem>
                <MenuItem value={"ibaraki"}>茨城県</MenuItem>
                <MenuItem value={"tochigi"}>栃木県</MenuItem>
                <MenuItem value={"gunma"}>群馬県</MenuItem>
                <MenuItem value={"saitama"}>埼玉県</MenuItem>
                <MenuItem value={"chiba"}>千葉県</MenuItem>
                <MenuItem value={"tokyo"}>東京都</MenuItem>
                <MenuItem value={"kanagawa"}>神奈川県</MenuItem>
                <MenuItem value={"niigata"}>新潟県</MenuItem>
                <MenuItem value={"toyama"}>富山県</MenuItem>
                <MenuItem value={"ishikawa"}>石川県</MenuItem>
                <MenuItem value={"fukui"}>福井県</MenuItem>
                <MenuItem value={"yamanashi"}>山梨県</MenuItem>
                <MenuItem value={"nagano"}>長野県</MenuItem>
                <MenuItem value={"gifu"}>岐阜県</MenuItem>
                <MenuItem value={"shizuoka"}>静岡県</MenuItem>
                <MenuItem value={"aichi"}>愛知県</MenuItem>
                <MenuItem value={"mie"}>三重県</MenuItem>
                <MenuItem value={"shiga"}>滋賀県</MenuItem>
                <MenuItem value={"kyoto"}>京都府</MenuItem>
                <MenuItem value={"osaka"}>大阪府</MenuItem>
                <MenuItem value={"hyogo"}>兵庫県</MenuItem>
                <MenuItem value={"nara"}>奈良県</MenuItem>
                <MenuItem value={"wakayama"}>和歌山県</MenuItem>
                <MenuItem value={"tottori"}>鳥取県</MenuItem>
                <MenuItem value={"shimane"}>島根県</MenuItem>
                <MenuItem value={"okayama"}>岡山県</MenuItem>
                <MenuItem value={"hiroshima"}>広島県</MenuItem>
                <MenuItem value={"yamaguchi"}>山口県</MenuItem>
                <MenuItem value={"tokushima"}>徳島県</MenuItem>
                <MenuItem value={"kagawa"}>香川県</MenuItem>
                <MenuItem value={"ehime"}>愛媛県</MenuItem>
                <MenuItem value={"kochi"}>高知県</MenuItem>
                <MenuItem value={"fukuoka"}>福岡県</MenuItem>
                <MenuItem value={"saga"}>佐賀県</MenuItem>
                <MenuItem value={"nagasaki"}>長崎県</MenuItem>
                <MenuItem value={"kumamoto"}>熊本県</MenuItem>
                <MenuItem value={"oita"}>大分県</MenuItem>
                <MenuItem value={"miyazaki"}>宮崎県</MenuItem>
                <MenuItem value={"kagoshima"}>鹿児島県</MenuItem>
                <MenuItem value={"okinawa"}>沖縄県</MenuItem>
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
      </Grid>
    </React.Fragment>
  );
}
