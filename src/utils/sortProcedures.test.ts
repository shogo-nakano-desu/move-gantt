import {
  Procedure,
  dummy_rentalCAN,
  dummy_gasTapStop,
  dummy_moveNotification,
  dummy_car,
} from "../info/procedures";
import { compareWithDeadline, sortedProcedures } from "./sortProcedures";

// export interface Procedure {
//   title: string;
//   startDate: Date; // プロジェクト作成日か関数で計算した日付
//   deadline: Date;
//   submitDestination: string;
//   targetPerson: TARGET_PERSON;
//   confirmationSource: string;
//   isSelfEmployed: boolean;
//   isStudent: boolean;
//   isPet: boolean;
//   isScooter: boolean;
//   isCar: boolean;
// }

//const TARGET_PERSON = {
//   moveInTheSameMunicipalities: "moveInTheSameMunicipalities",
//   moveToDifferentMunicipalities: "moveToDifferentMunicipalities",
//   everyone: "everyone",
// } as const;

const testProcedureA: Procedure = {
  title: "カード住所変更",
  startDate: new Date(2021, 7, 10),
  deadline: new Date(2021, 7, 30),
  submitDestination: "カード会社",
  targetPerson: "everyone",
  confirmationSource: "https://creditcard.com",
  isSelfEmployed: false,
  isStudent: false,
  isPet: false,
  isScooter: false,
  isCar: false,
};

const testProcedureB: Procedure = {
  title: "転出届",
  startDate: new Date(2021, 6, 10),
  deadline: new Date(2021, 7, 24),
  submitDestination: "管轄区役所",
  targetPerson: "moveToDifferentMunicipalities",
  confirmationSource: "https://kuyakusyo.com",
  isSelfEmployed: false,
  isStudent: false,
  isPet: false,
  isScooter: false,
  isCar: false,
};

const testProcedureC: Procedure = {
  title: "転入届",
  startDate: new Date(2021, 7, 10),
  deadline: new Date(2021, 7, 24),
  submitDestination: "管轄区役所",
  targetPerson: "everyone",
  confirmationSource: "https://kuyakusyo.com",
  isSelfEmployed: false,
  isStudent: false,
  isPet: false,
  isScooter: false,
  isCar: false,
};

test("check if sort works correctly", () => {
  expect(compareWithDeadline(testProcedureA, testProcedureB)).toEqual(1);
  expect(compareWithDeadline(testProcedureC, testProcedureB)).toEqual(1);
  expect(compareWithDeadline(testProcedureC, testProcedureA)).toEqual(-1);
});

test("check if sortedProcedures func create array correctly", () => {
  expect(sortedProcedures).toEqual([
    dummy_rentalCAN,
    dummy_gasTapStop,
    dummy_moveNotification,
    dummy_car,
  ]);
});
