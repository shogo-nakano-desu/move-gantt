import { dummy_procedures } from "../info/procedures";

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

export const sortedProcedures = dummy_procedures.slice().sort(compare);
