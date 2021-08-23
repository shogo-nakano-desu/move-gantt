import React from "react";
import firebase from "firebase";

type DataItemType = {
  title: string;
  startDate: number; // プロジェクト作成日か関数で計算した日付
  deadline: number;
  submitDestination: string;
  targetPerson: string;
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
};
type DataType = DataItemType[];

const isValid = (data: any): data is DataItemType => {
  if (!(data.startDate && typeof data.startDate === "number")) {
    return false;
  }
  if (!(data.deadline && typeof data.deadline === "number")) {
    return false;
  }
  if (!(data.title && typeof data.title === "string")) {
    return false;
  }
  if (!(data.submitDestination && typeof data.submitDestination === "string")) {
    return false;
  }
  if (
    !(data.confirmationSource && typeof data.confirmationSource === "string")
  ) {
    return false;
  }

  // [TODO]以下なぜか全て落ちる。
  if (!(data.memo != null && typeof data.memo === "string")) {
    return false;
  } // [TODO]この型で落ちる
  // if (!(data.complete && typeof data.complete === "boolean")) {
  //   return false;
  // } // [TODO]この型で落ちる

  if (
    !(data.isNotEmployee != null && typeof data.isNotEmployee === "boolean")
  ) {
    return false;
  }
  if (!(data.isStudent != null && typeof data.isStudent === "boolean")) {
    return false;
  }
  if (!(data.isPet != null && typeof data.isPet === "boolean")) {
    return false;
  }
  if (!(data.isScooter != null && typeof data.isScooter === "boolean")) {
    return false;
  }
  if (!(data.isCar != null && typeof data.isCar === "boolean")) {
    return false;
  }
  if (!(data.isParking != null && typeof data.isParking === "boolean")) {
    return false;
  }
  if (
    !(data.isUnderFifteen != null && typeof data.isUnderFifteen === "boolean")
  ) {
    return false;
  }
  if (
    !(data.isFireInsurance != null && typeof data.isFireInsurance === "boolean")
  ) {
    return false;
  }
  if (!(data.isFixedPhone != null && typeof data.isFixedPhone === "boolean")) {
    return false;
  }
  if (!(data.isMynumber != null && typeof data.isMynumber === "boolean")) {
    return false;
  }
  if (
    !(
      data.isStampRegistration != null &&
      typeof data.isStampRegistration === "boolean"
    )
  ) {
    return false;
  }
  if (
    !(
      data.isDrivingLicense != null &&
      typeof data.isDrivingLicense === "boolean"
    )
  ) {
    return false;
  }
  return true;
};

export const converter = {
  toFirestore(procedure: DataItemType): firebase.firestore.DocumentData {
    return {
      title: procedure.title,
      startDate: procedure.startDate, // プロジェクト作成日か関数で計算した日付
      deadline: procedure.deadline, //[TODO]これは１ヶ月前のパターンもあることを明示するか、選択できるようにしたい
      submitDestination: procedure.submitDestination, //
      targetPerson: procedure.targetPerson,
      confirmationSource: procedure.confirmationSource,
      memo: procedure.memo,
      complete: procedure.complete,
      isNotEmployee: procedure.isNotEmployee,
      isStudent: procedure.isStudent,
      isPet: procedure.isPet,
      isScooter: procedure.isScooter,
      isCar: procedure.isCar,
      isParking: procedure.isParking,
      isUnderFifteen: procedure.isUnderFifteen,
      isFireInsurance: procedure.isFireInsurance,
      isFixedPhone: procedure.isFixedPhone,
      isMynumber: procedure.isMynumber,
      isStampRegistration: procedure.isStampRegistration,
      isDrivingLicense: procedure.isDrivingLicense,
    };
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions
    //ここにfirestoreのFieldの型を書く
  ): DataItemType {
    const data = snapshot.data(options)!;
    if (!isValid(data)) {
      console.error(data);
      alert("invalid data");
      throw new Error("invalid data");
    }
    return {
      title: data.title,
      startDate: data.startDate, // プロジェクト作成日か関数で計算した日付
      deadline: data.deadline, //[TODO]これは１ヶ月前のパターンもあることを明示するか、選択できるようにしたい
      submitDestination: data.submitDestination, //
      targetPerson: data.targetPerson,
      confirmationSource: data.confirmationSource,
      memo: data.memo,
      complete: data.complete,
      isNotEmployee: data.isNotEmployee,
      isStudent: data.isStudent,
      isPet: data.isPet,
      isScooter: data.isScooter,
      isCar: data.isCar,
      isParking: data.isParking,
      isUnderFifteen: data.isUnderFifteen,
      isFireInsurance: data.isFireInsurance,
      isFixedPhone: data.isFixedPhone,
      isMynumber: data.isMynumber,
      isStampRegistration: data.isStampRegistration,
      isDrivingLicense: data.isDrivingLicense,
    };
  },
};
