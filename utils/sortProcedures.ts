import { dummy_procedures } from "../info/procedures";
// dummy_procedures: Procedure[]
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

// check できていないのでチェックする必要あり
const compare = (a, b) => {
  let comparison = 0;
  const startDateA = a.startDate;
  const startDateB = b.startDate;
  if (startDateA > startDateB) {
    comparison = 1;
  } else if (startDateA < startDateB) {
    comparison = -1;
  }
  return comparison;
};

export const sortedProcedures = dummy_procedures.sort(compare);
