import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import firebase from "firebase/app";
import { add } from "date-fns";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import AddressFormComponent from "../components/addressForm";
import DateFormComponent from "../components/dateForm";
import OtherFormComponent from "../components/otherForm";

import { auth, db } from "../../firebaseClient";
import AppBarComponent from "../components/AppBar";
import {
  stateType,
  refreshProjectForm,
  createNewProject,
  setCurrentUser,
} from "../utils/reducers";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: "relative",
    },
    title: {
      marginBottom: theme.spacing(3),
    },
    layout: {
      width: "auto",
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
        width: 600,
        marginLeft: "auto",
        marginRight: "auto",
      },
    },
    paper: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      padding: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(6),
        padding: theme.spacing(3),
      },
    },
    buttons: {
      display: "flex",
      justifyContent: "flex-end",
    },
    button: {
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(1),
      backgroundColor: "rgb(56,162,185)",
      "&:hover": {
        backgroundColor: "rgb(110,162,185)",
      },
    },
  })
);

export default function CreateProjectComponent() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const router = useRouter();
  // const activeStep = useSelector((state: stateType) => state.step.stepNum);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      user ? dispatch(setCurrentUser(user.uid)) : router.push("/sign-in");
    });
  }, []);

  const userId = useSelector((state: stateType) => state.user.uid);
  // firestoreに新規プロジェクトを作成するための関数群
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
  const willMoveDate = useSelector(
    (state: stateType) => state.projectForm.formWillMoveDate
  );
  const isNotEmployee = useSelector(
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

  interface Procedure {
    title: string;
    startDate: number; // プロジェクト作成日か関数で計算した日付
    deadline: number;
    submitDestination: string;
    targetPerson: TARGET_PERSON;
    confirmationSource: string;
    memo: string;
    complete: boolean;
    isNotEmployee: boolean;
    isStudent: boolean;
    isPet: boolean;
    isScooter: boolean;
    isCar: boolean;
    isParking: boolean;
    isUnderFifteen: boolean;
    isFireInsurance: boolean;
    isFixedPhone: boolean;
    isMynumber: boolean;
    isStampRegistration: boolean;
    isDrivingLicense: boolean;
    created_at: number;
  }

  const TARGET_PERSON = {
    moveInTheSameMunicipalities: "moveInTheSameMunicipalities",
    moveToDifferentMunicipalities: "moveToDifferentMunicipalities",
    everyone: "everyone",
  } as const;
  type TARGET_PERSON = typeof TARGET_PERSON[keyof typeof TARGET_PERSON];

  const moveDate = willMoveDate;

  const rentalCancellation: Procedure = {
    title: "賃貸物件の解約手続き",
    startDate: Date.now(), // プロジェクト作成日か関数で計算した日付
    deadline: add(moveDate, { months: -2 }).getTime(), //[TODO]これは１ヶ月前のパターンもあることを明示するか、選択できるようにしたい
    submitDestination: "管理会社や不動産会社、大家など",
    targetPerson: "everyone",
    confirmationSource:
      "管理会社や不動産会社、大家などに問い合わせ、契約内容を確認する",
    memo: "",
    complete: false,
    isNotEmployee: false,
    isStudent: false,
    isPet: false,
    isScooter: false,
    isCar: false,
    isParking: false,
    isUnderFifteen: false,
    isFireInsurance: false,
    isFixedPhone: false,
    isMynumber: false,
    isStampRegistration: false,
    isDrivingLicense: false,
    created_at: Date.now(),
  };

  const parkingCancellation: Procedure = {
    title: "駐車場の解約手続き",
    startDate: Date.now(), // プロジェクト作成日か関数で計算した日付
    deadline: add(moveDate, { months: -2 }).getTime(),
    submitDestination: "貸主もしくは管理会社",
    targetPerson: "everyone",
    confirmationSource: "契約書を確認、もしくは貸主、管理会社に問い合わせ",
    memo: "",
    complete: false,
    isNotEmployee: false,
    isStudent: false,
    isPet: false,
    isScooter: false, // 表示条件はscooterかcarどっちかがtrueにする
    isCar: false,
    isParking: true,
    isUnderFifteen: false,
    isFireInsurance: false,
    isFixedPhone: false,
    isMynumber: false,
    isStampRegistration: false,
    isDrivingLicense: false,
    created_at: Date.now(),
  };

  const moverContraction: Procedure = {
    title: "引越し業者との契約",
    startDate: Date.now(), // プロジェクト作成日か関数で計算した日付
    deadline: add(moveDate, { weeks: -1 }).getTime(),
    submitDestination: "各引越し業者",
    targetPerson: "everyone",
    confirmationSource:
      "各引越し業者のサイト。直前になるにつれて選択肢が狭まるので注意",
    memo: "",
    complete: false,
    isNotEmployee: false,
    isStudent: false,
    isPet: false,
    isScooter: false,
    isCar: false,
    isParking: false,
    isUnderFifteen: false,
    isFireInsurance: false,
    isFixedPhone: false,
    isMynumber: false,
    isStampRegistration: false,
    isDrivingLicense: false,
    created_at: Date.now(),
  };

  const schoolChanging: Procedure = {
    title: "学校の転校手続き",
    startDate: Date.now(), // プロジェクト作成日か関数で計算した日付
    deadline: add(new Date(), { weeks: 2 }).getTime(),
    submitDestination:
      "（公立校）役所（教育委員会）の窓口/ （私立校）学校の窓口",
    targetPerson: "everyone",
    confirmationSource:
      "https://hikkoshizamurai.jp/useful/procedure/other/school/",
    memo: "",
    complete: false,
    isNotEmployee: false,
    isStudent: true,
    isPet: false,
    isScooter: false,
    isCar: false,
    isParking: false,
    isUnderFifteen: false,
    isFireInsurance: false,
    isFixedPhone: false,
    isMynumber: false,
    isStampRegistration: false,
    isDrivingLicense: false,
    created_at: Date.now(),
  };

  const internet: Procedure = {
    title: "インターネットの引越し手続き",
    startDate: add(moveDate, { months: -1, weeks: -2 }).getTime(), // プロジェクト作成日か関数で計算した日付
    deadline: add(moveDate, { months: -1 }).getTime(), //
    submitDestination: "回線会社、プロバイダのHPもしくは電話など",
    targetPerson: "everyone",
    confirmationSource:
      "https://hikkoshizamurai.jp/useful/procedure/lifeline/internet/",
    memo: "",
    complete: false,
    isNotEmployee: false,
    isStudent: false,
    isPet: false,
    isScooter: false,
    isCar: false,
    isParking: false,
    isUnderFifteen: false,
    isFireInsurance: false,
    isFixedPhone: false,
    isMynumber: false,
    isStampRegistration: false,
    isDrivingLicense: false,
    created_at: Date.now(),
  };

  const largeGarbage: Procedure = {
    title: "粗大ゴミの処分手続き",
    startDate: Date.now(), // プロジェクト作成日か関数で計算した日付
    deadline: add(moveDate, { months: -1 }).getTime(),
    submitDestination: "各自治体もしくは粗大ゴミ回収業者",
    targetPerson: "everyone",
    confirmationSource:
      "https://hikkoshizamurai.jp/useful/unnecessary/#anchor05",
    memo: "",
    complete: false,
    isNotEmployee: false,
    isStudent: false,
    isPet: false,
    isScooter: false,
    isCar: false,
    isParking: false,
    isUnderFifteen: false,
    isFireInsurance: false,
    isFixedPhone: false,
    isMynumber: false,
    isStampRegistration: false,
    isDrivingLicense: false,
    created_at: Date.now(),
  };

  const fireInsurance: Procedure = {
    title: "火災保険の住所変更手続き",
    startDate: add(moveDate, { months: -1 }).getTime(), // プロジェクト作成日か関数で計算した日付
    deadline: add(moveDate, { weeks: -3 }).getTime(), //
    submitDestination: "保険会社",
    targetPerson: "everyone",
    confirmationSource:
      "https://hikkoshizamurai.jp/useful/procedure/other/fire-insurance/",
    memo: "",
    complete: false,
    isNotEmployee: false,
    isStudent: false,
    isPet: false,
    isScooter: false,
    isCar: false,
    isParking: false,
    isUnderFifteen: false,
    isFireInsurance: true,
    isFixedPhone: false,
    isMynumber: false,
    isStampRegistration: false,
    isDrivingLicense: false,
    created_at: Date.now(),
  };

  const movingOutNotification: Procedure = {
    title: "転出届の提出",
    startDate: add(moveDate, { weeks: -2 }).getTime(), // プロジェクト作成日か関数で計算した日付
    deadline: add(moveDate, { days: 13 }).getTime(), //
    submitDestination: "旧住所管轄の役場",
    targetPerson: "moveToDifferentMunicipalities",
    confirmationSource:
      "https://hikkoshizamurai.jp/useful/procedure/public/resident/",
    memo: "",
    complete: false,
    isNotEmployee: false,
    isStudent: false,
    isPet: false,
    isScooter: false,
    isCar: false,
    isParking: false,
    isUnderFifteen: false,
    isFireInsurance: false,
    isFixedPhone: false,
    isMynumber: false,
    isStampRegistration: false,
    isDrivingLicense: false,
    created_at: Date.now(),
  };

  const NationalHealthInsuranceCancellation: Procedure = {
    title: "国民健康保険の資格喪失手続き",
    startDate: add(moveDate, { weeks: -2 }).getTime(),
    deadline: add(moveDate, { days: 14 }).getTime(),
    submitDestination: "引越し元の市区町村役場",
    targetPerson: "moveToDifferentMunicipalities",
    confirmationSource:
      "https://hikkoshizamurai.jp/useful/procedure/public/nhl/#loss",
    memo: "",
    complete: false,
    isNotEmployee: true,
    isStudent: false,
    isPet: false,
    isScooter: false,
    isCar: false,
    isParking: false,
    isUnderFifteen: false,
    isFireInsurance: false,
    isFixedPhone: false,
    isMynumber: false,
    isStampRegistration: false,
    isDrivingLicense: false,
    created_at: Date.now(),
  };

  const stampDeletion: Procedure = {
    title: "印鑑登録の抹消",
    startDate: add(moveDate, { weeks: -2 }).getTime(),
    deadline: moveDate.getTime(),
    submitDestination: "旧住所の役場",
    targetPerson: "moveToDifferentMunicipalities",
    confirmationSource:
      "https://hikkoshizamurai.jp/useful/procedure/public/seal/",
    memo: "",
    complete: false,
    isNotEmployee: false,
    isStudent: false,
    isPet: false,
    isScooter: false,
    isCar: false,
    isParking: false,
    isUnderFifteen: false,
    isFireInsurance: false,
    isFixedPhone: false,
    isMynumber: false,
    isStampRegistration: true,
    isDrivingLicense: false,
    created_at: Date.now(),
  };

  const scooterDeletion: Procedure = {
    title: "原付の廃車手続き・住所変更",
    startDate: add(moveDate, { weeks: -2 }).getTime(),
    deadline: add(moveDate, { days: 15 }).getTime(),
    submitDestination: "市区町村役場もしくは陸運局",
    targetPerson: "moveToDifferentMunicipalities",
    confirmationSource:
      "https://hikkoshizamurai.jp/useful/procedure/vehicle/motorcycle/",
    memo: "",
    complete: false,
    isNotEmployee: false,
    isStudent: false,
    isPet: false,
    isScooter: true,
    isCar: false,
    isParking: false,
    isUnderFifteen: false,
    isFireInsurance: false,
    isFixedPhone: false,
    isMynumber: false,
    isStampRegistration: false,
    isDrivingLicense: false,
    created_at: Date.now(),
  };

  const childAllowance: Procedure = {
    title: "児童手当の住所変更手続き",
    startDate: add(moveDate, { weeks: -2 }).getTime(),
    deadline: add(moveDate, { days: 15 }).getTime(),
    submitDestination:
      "引越し元住所に「児童手当受給事由消滅届」⇨引越し先住所に「児童手当認定請求書」",
    targetPerson: "moveToDifferentMunicipalities",
    confirmationSource:
      "https://hikkoshizamurai.jp/useful/procedure/public/allowance/",
    memo: "",
    complete: false,
    isNotEmployee: false,
    isStudent: false,
    isPet: false,
    isScooter: false,
    isCar: false,
    isParking: false,
    isUnderFifteen: true,
    isFireInsurance: false,
    isFixedPhone: false,
    isMynumber: false,
    isStampRegistration: false,
    isDrivingLicense: false,
    created_at: Date.now(),
  };

  const electricity: Procedure = {
    title: "電気の使用停止・開始手続き",
    startDate: add(moveDate, { weeks: -2 }).getTime(),
    deadline: add(moveDate, { weeks: -1 }).getTime(),
    submitDestination: "電力会社のHPもしくは電話",
    targetPerson: "everyone",
    confirmationSource:
      "https://hikkoshizamurai.jp/useful/procedure/lifeline/electricity/#oldAddress",
    memo: "",
    complete: false,
    isNotEmployee: false,
    isStudent: false,
    isPet: false,
    isScooter: false,
    isCar: false,
    isParking: false,
    isUnderFifteen: false,
    isFireInsurance: false,
    isFixedPhone: false,
    isMynumber: false,
    isStampRegistration: false,
    isDrivingLicense: false,
    created_at: Date.now(),
  };

  const gasTap: Procedure = {
    title: "ガスの使用中止・開始手続き",
    startDate: add(moveDate, { weeks: -2 }).getTime(),
    deadline: add(moveDate, { weeks: -1 }).getTime(),
    submitDestination: "ガス会社",
    targetPerson: "everyone",
    confirmationSource:
      "https://hikkoshizamurai.jp/useful/procedure/lifeline/gas/#oldAddress",
    memo: "",
    complete: false,
    isNotEmployee: false,
    isStudent: false,
    isPet: false,
    isScooter: false,
    isCar: false,
    isParking: false,
    isUnderFifteen: false,
    isFireInsurance: false,
    isFixedPhone: false,
    isMynumber: false,
    isStampRegistration: false,
    isDrivingLicense: false,
    created_at: Date.now(),
  };

  const tapwaterCancellation: Procedure = {
    title: "水道の使用中止手続き",
    startDate: add(moveDate, { weeks: -2 }).getTime(),
    deadline: add(moveDate, { days: -2 }).getTime(),
    submitDestination: "水道局",
    targetPerson: "everyone",
    confirmationSource:
      "https://hikkoshizamurai.jp/useful/procedure/lifeline/water/#oldAddress",
    memo: "",
    complete: false,
    isNotEmployee: false,
    isStudent: false,
    isPet: false,
    isScooter: false,
    isCar: false,
    isParking: false,
    isUnderFifteen: false,
    isFireInsurance: false,
    isFixedPhone: false,
    isMynumber: false,
    isStampRegistration: false,
    isDrivingLicense: false,
    created_at: Date.now(),
  };

  const tapwaterStart: Procedure = {
    title: "水道の使用開始手続き",
    startDate: moveDate.getTime(),
    deadline: add(moveDate, { days: 10 }).getTime(),
    submitDestination: "水道局webサイト、郵便、電話",
    targetPerson: "everyone",
    confirmationSource:
      "https://hikkoshizamurai.jp/useful/procedure/lifeline/water/#oldAddress",
    memo: "",
    complete: false,
    isNotEmployee: false,
    isStudent: false,
    isPet: false,
    isScooter: false,
    isCar: false,
    isParking: false,
    isUnderFifteen: false,
    isFireInsurance: false,
    isFixedPhone: false,
    isMynumber: false,
    isStampRegistration: false,
    isDrivingLicense: false,
    created_at: Date.now(),
  };

  const postofficeChangeAddress: Procedure = {
    title: "転居・転送届",
    startDate: add(moveDate, { weeks: -2 }).getTime(),
    deadline: add(moveDate, { weeks: -1 }).getTime(),
    submitDestination: "郵便局",
    targetPerson: "everyone",
    confirmationSource:
      "https://hikkoshizamurai.jp/useful/procedure/lifeline/post/",
    memo: "",
    complete: false,
    isNotEmployee: false,
    isStudent: false,
    isPet: false,
    isScooter: false,
    isCar: false,
    isParking: false,
    isUnderFifteen: false,
    isFireInsurance: false,
    isFixedPhone: false,
    isMynumber: false,
    isStampRegistration: false,
    isDrivingLicense: false,
    created_at: Date.now(),
  };

  // [TODO]固定電話を持っているかどうか
  const fixedPhone: Procedure = {
    title: "固定電話の住所変更手続き",
    startDate: Date.now(),
    deadline: add(moveDate, { weeks: -2 }).getTime(),
    submitDestination: "NTT",
    targetPerson: "everyone",
    confirmationSource:
      "https://hikkoshizamurai.jp/useful/procedure/lifeline/telephone/",
    memo: "",
    complete: false,
    isNotEmployee: false,
    isStudent: false,
    isPet: false,
    isScooter: false,
    isCar: false,
    isParking: false,
    isUnderFifteen: false,
    isFireInsurance: false,
    isFixedPhone: true,
    isMynumber: false,
    isStampRegistration: false,
    isDrivingLicense: false,
    created_at: Date.now(),
  };

  const mobilePhone: Procedure = {
    title: "携帯電話・スマートフォンの住所変更手続",
    startDate: moveDate.getTime(),
    deadline: add(moveDate, { weeks: 1 }).getTime(),
    submitDestination: "携帯電話会社のHP、電話、窓口など",
    targetPerson: "everyone",
    confirmationSource:
      "https://hikkoshizamurai.jp/useful/procedure/lifeline/mobile-phone/",
    memo: "",
    complete: false,
    isNotEmployee: false,
    isStudent: false,
    isPet: false,
    isScooter: false,
    isCar: false,
    isParking: false,
    isUnderFifteen: false,
    isFireInsurance: false,
    isFixedPhone: false,
    isMynumber: false,
    isStampRegistration: false,
    isDrivingLicense: false,
    created_at: Date.now(),
  };

  const pet: Procedure = {
    title: "ペットの登録事項変更届",
    startDate: add(moveDate, { weeks: -1 }).getTime(),
    deadline: add(moveDate, { weeks: 1 }).getTime(),
    submitDestination: "市区町村役所の窓口、保健所など",
    targetPerson: "everyone",
    confirmationSource:
      "https://hikkoshizamurai.jp/useful/procedure/other/pet-address/",
    memo: "",
    complete: false,
    isNotEmployee: false,
    isStudent: false,
    isPet: true,
    isScooter: false,
    isCar: false,
    isParking: false,
    isUnderFifteen: false,
    isFireInsurance: false,
    isFixedPhone: false,
    isMynumber: false,
    isStampRegistration: false,
    isDrivingLicense: false,
    created_at: Date.now(),
  };

  const gasPrecense: Procedure = {
    title: "ガス使用停止の立ち合い",
    startDate: moveDate.getTime(),
    deadline: moveDate.getTime(),
    submitDestination: "旧居",
    targetPerson: "everyone",
    confirmationSource:
      "https://hikkoshizamurai.jp/useful/procedure/lifeline/gas/#oldAddress",
    memo: "",
    complete: false,
    isNotEmployee: false,
    isStudent: false,
    isPet: false,
    isScooter: false,
    isCar: false,
    isParking: false,
    isUnderFifteen: false,
    isFireInsurance: false,
    isFixedPhone: false,
    isMynumber: false,
    isStampRegistration: false,
    isDrivingLicense: false,
    created_at: Date.now(),
  };

  const tapPrecense: Procedure = {
    title: "水道使用停止の立ち合い",
    startDate: moveDate.getTime(),
    deadline: moveDate.getTime(),
    submitDestination: "旧居",
    targetPerson: "everyone",
    confirmationSource:
      "https://hikkoshizamurai.jp/useful/procedure/lifeline/water/#oldAddress",
    memo: "",
    complete: false,
    isNotEmployee: false,
    isStudent: false,
    isPet: false,
    isScooter: false,
    isCar: false,
    isParking: false,
    isUnderFifteen: false,
    isFireInsurance: false,
    isFixedPhone: false,
    isMynumber: false,
    isStampRegistration: false,
    isDrivingLicense: false,
    created_at: Date.now(),
  };

  const moveOutPrecense: Procedure = {
    title: "旧居の明け渡し",
    startDate: moveDate.getTime(),
    deadline: moveDate.getTime(),
    submitDestination: "旧居",
    targetPerson: "everyone",
    confirmationSource: "なし",
    memo: "",
    complete: false,
    isNotEmployee: false,
    isStudent: false,
    isPet: false,
    isScooter: false,
    isCar: false,
    isParking: false,
    isUnderFifteen: false,
    isFireInsurance: false,
    isFixedPhone: false,
    isMynumber: false,
    isStampRegistration: false,
    isDrivingLicense: false,
    created_at: Date.now(),
  };

  const gasStartPrecense: Procedure = {
    title: "ガス開栓の立ち会い",
    startDate: moveDate.getTime(),
    deadline: moveDate.getTime(),
    submitDestination: "新居",
    targetPerson: "everyone",
    confirmationSource:
      "https://hikkoshizamurai.jp/useful/procedure/lifeline/gas/#newAddress",
    memo: "",
    complete: false,
    isNotEmployee: false,
    isStudent: false,
    isPet: false,
    isScooter: false,
    isCar: false,
    isParking: false,
    isUnderFifteen: false,
    isFireInsurance: false,
    isFixedPhone: false,
    isMynumber: false,
    isStampRegistration: false,
    isDrivingLicense: false,
    created_at: Date.now(),
  };

  const movingNotification: Procedure = {
    title: "転居届",
    startDate: moveDate.getTime(),
    deadline: add(moveDate, { days: 14 }).getTime(),
    submitDestination: "市区町村役場",
    targetPerson: "moveInTheSameMunicipalities",
    confirmationSource:
      "https://hikkoshizamurai.jp/useful/procedure/public/resident/",
    memo: "",
    complete: false,
    isNotEmployee: false,
    isStudent: false,
    isPet: false,
    isScooter: false,
    isCar: false,
    isParking: false,
    isUnderFifteen: false,
    isFireInsurance: false,
    isFixedPhone: false,
    isMynumber: false,
    isStampRegistration: false,
    isDrivingLicense: false,
    created_at: Date.now(),
  };

  const transferNotification: Procedure = {
    title: "転入届",
    startDate: moveDate.getTime(),
    deadline: add(moveDate, { days: 14 }).getTime(),
    submitDestination: "市区町村役場",
    targetPerson: "moveToDifferentMunicipalities",
    confirmationSource:
      "https://hikkoshizamurai.jp/useful/procedure/public/resident/",
    memo: "",
    complete: false,
    isNotEmployee: false,
    isStudent: false,
    isPet: false,
    isScooter: false,
    isCar: false,
    isParking: false,
    isUnderFifteen: false,
    isFireInsurance: false,
    isFixedPhone: false,
    isMynumber: false,
    isStampRegistration: false,
    isDrivingLicense: false,
    created_at: Date.now(),
  };

  const mynumber: Procedure = {
    title: "マイナンバーの住所変更",
    startDate: moveDate.getTime(),
    deadline: add(moveDate, { days: 14 }).getTime(),
    submitDestination: "市区町村役場",
    targetPerson: "everyone",
    confirmationSource:
      "https://hikkoshizamurai.jp/useful/procedure/public/my-number/",
    memo: "",
    complete: false,
    isNotEmployee: false,
    isStudent: false,
    isPet: false,
    isScooter: false,
    isCar: false,
    isParking: false,
    isUnderFifteen: false,
    isFireInsurance: false,
    isFixedPhone: false,
    isMynumber: true,
    isStampRegistration: false,
    isDrivingLicense: false,
    created_at: Date.now(),
  };

  const stampRegistration: Procedure = {
    title: "印鑑登録",
    startDate: moveDate.getTime(),
    deadline: add(moveDate, { days: 21 }).getTime(),
    submitDestination: "市区町村役場",
    targetPerson: "moveToDifferentMunicipalities",
    confirmationSource:
      "https://hikkoshizamurai.jp/useful/procedure/public/seal/",
    memo: "",
    complete: false,
    isNotEmployee: false,
    isStudent: false,
    isPet: false,
    isScooter: false,
    isCar: false,
    isParking: false,
    isUnderFifteen: false,
    isFireInsurance: false,
    isFixedPhone: false,
    isMynumber: false,
    isStampRegistration: true,
    isDrivingLicense: false,
    created_at: Date.now(),
  };

  const compensation: Procedure = {
    title: "国民年金の住所変更",
    startDate: moveDate.getTime(),
    deadline: add(moveDate, { days: 14 }).getTime(),
    submitDestination: "市区町村役場",
    targetPerson: "everyone",
    confirmationSource:
      "https://hikkoshizamurai.jp/useful/procedure/public/national-pension/",
    memo: "",
    complete: false,
    isNotEmployee: true,
    isStudent: false,
    isPet: false,
    isScooter: false,
    isCar: false,
    isParking: false,
    isUnderFifteen: false,
    isFireInsurance: false,
    isFixedPhone: false,
    isMynumber: false,
    isStampRegistration: false,
    isDrivingLicense: false,
    created_at: Date.now(),
  };
  // [TODO]個人事業主、フリーターだけ必要＝会社員以外必要
  const nationalHealthInsuranceRegistration: Procedure = {
    title: "国民健康保険の加入",
    startDate: moveDate.getTime(),
    deadline: add(moveDate, { days: 14 }).getTime(),
    submitDestination: "引越し先の市区町村役場",
    targetPerson: "moveToDifferentMunicipalities",
    confirmationSource:
      "https://hikkoshizamurai.jp/useful/procedure/public/nhl/#join",
    memo: "",
    complete: false,
    isNotEmployee: true,
    isStudent: false,
    isPet: false,
    isScooter: false,
    isCar: false,
    isParking: false,
    isUnderFifteen: false,
    isFireInsurance: false,
    isFixedPhone: false,
    isMynumber: false,
    isStampRegistration: false,
    isDrivingLicense: false,
    created_at: Date.now(),
  };
  // [TODO]個人事業主、フリーターだけ必要＝会社員以外必要
  const nationalHealthInsuranceChange: Procedure = {
    title: "国民健康保険の住所変更",
    startDate: moveDate.getTime(),
    deadline: add(moveDate, { days: 14 }).getTime(),
    submitDestination: "引越し先の市区町村役場",
    targetPerson: "moveInTheSameMunicipalities",
    confirmationSource:
      "https://hikkoshizamurai.jp/useful/procedure/public/nhl/#join",
    memo: "",
    complete: false,
    isNotEmployee: true,
    isStudent: false,
    isPet: false,
    isScooter: false,
    isCar: false,
    isParking: false,
    isUnderFifteen: false,
    isFireInsurance: false,
    isFixedPhone: false,
    isMynumber: false,
    isStampRegistration: false,
    isDrivingLicense: false,
    created_at: Date.now(),
  };
  const company: Procedure = {
    title: "会社の健康保険と厚生年金の変更手続き",
    startDate: moveDate.getTime(),
    deadline: add(moveDate, { days: 7 }).getTime(),
    submitDestination: "勤め先の担当部署",
    targetPerson: "everyone",
    confirmationSource: "なし",
    memo: "",
    complete: false,
    isNotEmployee: false,
    isStudent: false,
    isPet: false,
    isScooter: false,
    isCar: false,
    isParking: false,
    isUnderFifteen: false,
    isFireInsurance: false,
    isFixedPhone: false,
    isMynumber: false,
    isStampRegistration: false,
    isDrivingLicense: false,
    created_at: Date.now(),
  };

  const parkingCertification: Procedure = {
    title: "車庫証明の取得申請",
    startDate: moveDate.getTime(),
    deadline: add(moveDate, { days: 15 }).getTime(),
    submitDestination: "保管場所を管轄する警察署",
    targetPerson: "everyone",
    confirmationSource:
      "https://hikkoshizamurai.jp/useful/procedure/vehicle/parking-space/",
    memo: "",
    complete: false,
    isNotEmployee: false,
    isStudent: false,
    isPet: false,
    isScooter: false,
    isCar: true,
    isParking: false,
    isUnderFifteen: false,
    isFireInsurance: false,
    isFixedPhone: false,
    isMynumber: false,
    isStampRegistration: false,
    isDrivingLicense: false,
    created_at: Date.now(),
  };
  // [TODO]免許を持っているかどうか
  const drivingLicense: Procedure = {
    title: "免許証の住所変更手続き",
    startDate: moveDate.getTime(),
    deadline: add(moveDate, { days: 14 }).getTime(),
    submitDestination:
      "新居住地の警察署運転免許課、運転免許センター、運転免許試験場",
    targetPerson: "everyone",
    confirmationSource:
      "https://hikkoshizamurai.jp/useful/procedure/vehicle/license/",
    memo: "",
    complete: false,
    isNotEmployee: false,
    isStudent: false,
    isPet: false,
    isScooter: false,
    isCar: false,
    isParking: false,
    isUnderFifteen: false,
    isFireInsurance: false,
    isFixedPhone: false,
    isMynumber: false,
    isStampRegistration: false,
    isDrivingLicense: true,
    created_at: Date.now(),
  };

  const carAddress: Procedure = {
    title: "自動車の住所変更手続き",
    startDate: moveDate.getTime(),
    deadline: add(moveDate, { days: 15 }).getTime(),
    submitDestination: "新居住地の地方運輸局、運輸支局、自動車検査登録事務所",
    targetPerson: "everyone",
    confirmationSource:
      "https://hikkoshizamurai.jp/useful/procedure/vehicle/car/",
    memo: "",
    complete: false,
    isNotEmployee: false,
    isStudent: false,
    isPet: false,
    isScooter: false,
    isCar: true,
    isParking: false,
    isUnderFifteen: false,
    isFireInsurance: false,
    isFixedPhone: false,
    isMynumber: false,
    isStampRegistration: false,
    isDrivingLicense: false,
    created_at: Date.now(),
  };

  const creaditcard: Procedure = {
    title: "クレジットカードの住所変更手続き",
    startDate: moveDate.getTime(),
    deadline: add(moveDate, { weeks: 1 }).getTime(),
    submitDestination: "クレジットカード会社のHP、郵送、電話",
    targetPerson: "everyone",
    confirmationSource:
      "https://hikkoshizamurai.jp/useful/procedure/other/credit-card/",
    memo: "",
    complete: false,
    isNotEmployee: false,
    isStudent: false,
    isPet: false,
    isScooter: false,
    isCar: false,
    isParking: false,
    isUnderFifteen: false,
    isFireInsurance: false,
    isFixedPhone: false,
    isMynumber: false,
    isStampRegistration: false,
    isDrivingLicense: false,
    created_at: Date.now(),
  };

  const bankAccount: Procedure = {
    title: "銀行口座の住所変更",
    startDate: moveDate.getTime(),
    deadline: add(moveDate, { days: 15 }).getTime(),
    submitDestination: "銀行",
    targetPerson: "everyone",
    confirmationSource:
      "https://hikkoshizamurai.jp/useful/procedure/other/bank/",
    memo: "",
    complete: false,
    isNotEmployee: false,
    isStudent: false,
    isPet: false,
    isScooter: false,
    isCar: false,
    isParking: false,
    isUnderFifteen: false,
    isFireInsurance: false,
    isFixedPhone: false,
    isMynumber: false,
    isStampRegistration: false,
    isDrivingLicense: false,
    created_at: Date.now(),
  };

  const onlineShop: Procedure = {
    title: "通販サイトの住所変更手続き",
    startDate: moveDate.getTime(),
    deadline: add(moveDate, { weeks: 3 }).getTime(),
    submitDestination: "各通販サイト",
    targetPerson: "everyone",
    confirmationSource: "なし",
    memo: "",
    complete: false,
    isNotEmployee: false,
    isStudent: false,
    isPet: false,
    isScooter: false,
    isCar: false,
    isParking: false,
    isUnderFifteen: false,
    isFireInsurance: false,
    isFixedPhone: false,
    isMynumber: false,
    isStampRegistration: false,
    isDrivingLicense: false,
    created_at: Date.now(),
  };

  const procedures: Procedure[] = [
    rentalCancellation,
    parkingCancellation,
    moverContraction,
    schoolChanging,
    internet,
    largeGarbage,
    fireInsurance,
    movingOutNotification,
    NationalHealthInsuranceCancellation,
    stampDeletion,
    scooterDeletion,
    childAllowance,
    electricity,
    gasTap,
    tapwaterCancellation,
    tapwaterStart,
    postofficeChangeAddress,
    fixedPhone,
    mobilePhone,
    pet,
    gasPrecense,
    tapPrecense,
    moveOutPrecense,
    gasStartPrecense,
    movingNotification,
    transferNotification,
    mynumber,
    stampRegistration,
    compensation,
    nationalHealthInsuranceRegistration,
    nationalHealthInsuranceChange,
    company,
    parkingCertification,
    drivingLicense,
    carAddress,
    creaditcard,
    bankAccount,
    onlineShop,
  ];

  // 最後にstateを空にする処理を忘れずに書く
  // この前に、usercollectionを作成して、そこに入れるようにしたほうが良さげ
  const putProjectToFirestore = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const filteredTodos = procedures.filter((procedure) => {
      // ロジックはOK
      if (
        !(isCar === false && procedure.isCar === true) &&
        !(isDrivingLicense === false && procedure.isDrivingLicense === true) &&
        !(isFireInsurance === false && procedure.isFireInsurance === true) &&
        !(isFixedPhone === false && procedure.isFixedPhone === true) &&
        !(isMynumber === false && procedure.isMynumber === true) &&
        !(isPet === false && procedure.isPet === true) &&
        !(isScooter === false && procedure.isScooter === true) &&
        !(isNotEmployee === false && procedure.isNotEmployee === true) &&
        !(
          isStampRegistration === false &&
          procedure.isStampRegistration === true
        ) &&
        !(isStudent === false && procedure.isStudent === true) &&
        !(isUnderFifteen === false && procedure.isUnderFifteen === true)
      ) {
        return true;
      }
    });
    console.log("filteredTodos:", filteredTodos);
    console.log("firestoreに登録開始");
    db.collection("users")
      .doc(userId)
      .collection("projects")
      .add({
        willMovePrefecture: willMovePrefecture,
        willMoveAddress: willMoveAddress,
        moveFromPrefecture: moveFromPrefecture,
        moveFromAddress: moveFromAddress,
        willMoveDate: willMoveDate!.getTime(),
        isNotEmployee: isNotEmployee,
        isStudent: isStudent,
        isPet: isPet,
        isScooter: isScooter,
        isCar: isCar,
        isUnderFifteen: isUnderFifteen,
        isFireInsurance: isFireInsurance,
        isFixedPhone: isFixedPhone,
        isMynumber: isMynumber,
        isStampRegistration: isStampRegistration,
        isDrivingLicense: isDrivingLicense,
        created_at: Date.now(),
      })
      .then((docRef) => {
        console.log("ループ前のprojectId", docRef.id);
        for (let i = 0; i < filteredTodos.length; i++) {
          console.log(i);
          db.collection("users")
            .doc(userId)
            .collection("projects")
            .doc(docRef.id)
            .collection("todos")
            .add(filteredTodos[i]);
        }
        console.log("TODOS登録も完了");
        const projectId = docRef.id;
        return projectId;
      })
      .then((projectId) => {
        dispatch(createNewProject(projectId));
      })
      .then(() => {
        dispatch(refreshProjectForm());
        console.log("project stateの初期化完了");
      })
      .then(() => router.push("/dashboard"))
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBarComponent></AppBarComponent>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography
            className={classes.title}
            component="h1"
            variant="h4"
            align="center"
          >
            引越しプロジェクト登録
          </Typography>

          <React.Fragment>
            <form onSubmit={putProjectToFirestore} id="myform">
              <AddressFormComponent />
              <DateFormComponent />
              <OtherFormComponent />

              <div className={classes.buttons}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  type="submit"
                >
                  登録完了
                </Button>
              </div>
            </form>
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
}
