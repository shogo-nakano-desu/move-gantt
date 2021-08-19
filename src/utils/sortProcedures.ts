import { procedures, Procedure } from "../info/procedures";

// sortedProceduresでdummy_proceduresのところにProceduresを渡すと、deadlineが早い順に並び替える関数
export const compareWithDeadline = (a: Procedure, b: Procedure) => {
  let comparison = 0;
  const deadlineA = a.deadline.getTime();
  const deadlineB = b.deadline.getTime();
  const startDateA = a.startDate.getTime();
  const startDateB = b.startDate.getTime();

  if (deadlineA > deadlineB) {
    comparison = 1;
  } else if (deadlineA < deadlineB) {
    comparison = -1;
  } else if (deadlineA === deadlineB) {
    if (startDateA > startDateB) {
      comparison = 1;
    } else if (startDateA < startDateB) {
      comparison = -1;
    } else if (startDateA === startDateB) {
      comparison = -1;
    }
  }
  return comparison;
};

export const sortedProcedures = procedures.slice().sort(compareWithDeadline);
