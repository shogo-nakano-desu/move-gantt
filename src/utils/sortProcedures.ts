import { dummy_procedures } from "../info/procedures";

const compareWithDeadline = (a, b) => {
  let comparison = 0;
  const deadlineA = a.deadline;
  const deadlineB = b.deadline;
  if (deadlineA > deadlineB) {
    comparison = 1;
  } else if (deadlineA < deadlineB) {
    comparison = -1;
  }
  return comparison;
};

export const sortedProcedures = dummy_procedures
  .slice()
  .sort(compareWithDeadline);
