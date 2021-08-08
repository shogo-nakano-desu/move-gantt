import { sortedProcedures } from "./sortProcedures";
import { moveDate } from "../info/procedures";
import { add } from "date-fns";

export const splitedProcedures = () => {
  const weekOneProcedures = [];
  const weekTwoProcedures = [];
  const weekThreeProcedures = [];
  const weekFourProcedures = [];
  const weekFiveProcedures = [];
  const weekSixProcedures = [];
  const weekSevenProcedures = [];
  const weekEightProcedures = [];
  // これはどのイベントを一番最初にするかによって変わってくる
  const firstWeek = add(moveDate, { months: -1 });
  // procedureがどの週にマッピングされるべきか決まる
  sortedProcedures.map((procedure) => {
    if (
      procedure.startDate >= firstWeek &&
      procedure.startDate < add(firstWeek, { days: 7 })
    ) {
      weekOneProcedures.push(procedure);
    } else if (
      procedure.startDate >= add(firstWeek, { weeks: 1 }) &&
      procedure.startDate < add(firstWeek, { weeks: 2 })
    ) {
      weekTwoProcedures.push(procedure);
    } else if (
      procedure.startDate >= add(firstWeek, { weeks: 2 }) &&
      procedure.startDate < add(firstWeek, { weeks: 3 })
    ) {
      weekThreeProcedures.push(procedure);
    } else if (
      procedure.startDate >= add(firstWeek, { weeks: 3 }) &&
      procedure.startDate < add(firstWeek, { weeks: 4 })
    ) {
      weekFourProcedures.push(procedure);
    } else if (
      procedure.startDate >= add(firstWeek, { weeks: 4 }) &&
      procedure.startDate < add(firstWeek, { weeks: 5 })
    ) {
      weekFiveProcedures.push(procedure);
    } else if (
      procedure.startDate >= add(firstWeek, { weeks: 5 }) &&
      procedure.startDate < add(firstWeek, { weeks: 6 })
    ) {
      weekSixProcedures.push(procedure);
    } else if (
      procedure.startDate >= add(firstWeek, { weeks: 8 }) &&
      procedure.startDate < add(firstWeek, { weeks: 9 })
    ) {
      weekEightProcedures.push(procedure);
    }
  });
  return {
    weekOneProcedures: weekOneProcedures,
    weekTwoProcedures: weekTwoProcedures,
    weekThreeProcedures: weekThreeProcedures,
    weekFourProcedures: weekFourProcedures,
    weekFiveProcedures: weekFiveProcedures,
    weekSixProcedures: weekSixProcedures,
    weekSevenProcedures: weekSevenProcedures,
    weekEightProcedures: weekEightProcedures,
  };
};
