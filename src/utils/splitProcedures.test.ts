import { splittedProcedures } from "./splitProcedures";

const TARGET_PERSON = {
  moveInTheSameMunicipalities: "moveInTheSameMunicipalities",
  moveToDifferentMunicipalities: "moveToDifferentMunicipalities",
  everyone: "everyone",
} as const;
type TARGET_PERSON = typeof TARGET_PERSON[keyof typeof TARGET_PERSON];

interface procedureType {
  id: string;
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

const testProcedureA: procedureType = {
  id: "testprocedurea",
  title: "testA",
  startDate: new Date(2021, 8, 1).getTime(),
  deadline: new Date(2021, 8, 10).getTime(),
  submitDestination: "DFIOAJFIOAJDIOEFJAO JEWOI ",
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

const testProcedureB: procedureType = {
  id: "testprocedureb",
  title: "testB",
  startDate: new Date(2021, 8, 1).getTime(),
  deadline: new Date(2021, 8, 20).getTime(),
  submitDestination: "DFIOAJFIOAJDIOEFJAO JEWOI ",
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

const testProcedureC: procedureType = {
  id: "testprocedurec",
  title: "testC",
  startDate: new Date(2021, 8, 2).getTime(),
  deadline: new Date(2021, 8, 20).getTime(),
  submitDestination: "DFIOAJFIOAJDIOEFJAO JEWOI ",
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

const testProcedureD: procedureType = {
  id: "testprocedured",
  title: "testD",
  startDate: new Date(2021, 6, 1).getTime(),
  deadline: new Date(2021, 7, 1).getTime(),
  submitDestination: "DFIOAJFIOAJDIOEFJAO JEWOI ",
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

const testProcedureE: procedureType = {
  id: "testproceduree",
  title: "testE",
  startDate: new Date(2021, 6, 1).getTime(),
  deadline: new Date(2021, 10, 1).getTime(),
  submitDestination: "DFIOAJFIOAJDIOEFJAO JEWOI ",
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

const procedures = [
  testProcedureA,
  testProcedureB,
  testProcedureC,
  testProcedureD,
  testProcedureE,
];

const spy = jest.spyOn(Date, "now");
spy.mockReturnValue(1577804400000); // 2020/01/01

test("split some procedures by week", () => {
  expect(splittedProcedures(procedures, new Date(2021, 8, 10))).toEqual([
    [testProcedureD],
    [],
    [],
    [],
    [testProcedureA],
    [],
    [testProcedureB, testProcedureC],
    [testProcedureE],
  ]);
  spy.mockRestore();
});
