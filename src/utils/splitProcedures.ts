import { add } from "date-fns";
import { moveDate, Procedure } from "../info/procedures";
import { procedureType } from "../utils/reducers";

//[TODO]数字がそのままでややこしいのでリファクタリングする必要あり

// sortedProceduresで並び替えたProcedure[] typeの配列を週ごとに切り分ける関数
// trelloのようにレンダリングする際に、該当週の配列だけレンダリングしやすいようにする
// 現在week8までしか実装していないので、week9以降のtodoが見つかった場合には、別途実装する必要がある。いったんエラーを投げるようにしておこう
export const splittedProcedures = (procedures: procedureType[]) => {
  const weekOneProcedures: procedureType[] = [];
  const weekSixProcedures: procedureType[] = [];
  const weekSevenProcedures: procedureType[] = [];
  const weekEightProcedures: procedureType[] = [];
  const weekNineProcedures: procedureType[] = [];
  const weekTenProcedures: procedureType[] = [];
  const weekElevenProcedures: procedureType[] = [];
  const weekTwelveProcedures: procedureType[] = [];
  // これはどのイベントを一番最初にするかによって変わってくる
  const firstWeek = add(moveDate, { months: -2 });
  const oneMonthBeforeMove = add(moveDate, { months: -1, weeks: 1 });
  // procedureがどの週にマッピングされるべきか決まる
  procedures.map((procedure: procedureType) => {
    const deadlineDate = new Date(procedure.deadline);
    if (deadlineDate >= firstWeek && deadlineDate < oneMonthBeforeMove) {
      weekOneProcedures.push(procedure);
    } else if (
      deadlineDate >= add(firstWeek, { weeks: 5 }) &&
      deadlineDate < add(firstWeek, { weeks: 6 })
    ) {
      weekSixProcedures.push(procedure);
    } else if (
      deadlineDate >= add(firstWeek, { weeks: 6 }) &&
      deadlineDate < add(firstWeek, { weeks: 7 })
    ) {
      weekSevenProcedures.push(procedure);
    } else if (
      deadlineDate >= add(firstWeek, { weeks: 7 }) &&
      deadlineDate < add(firstWeek, { weeks: 8 })
    ) {
      weekEightProcedures.push(procedure);
    } else if (
      deadlineDate >= add(firstWeek, { weeks: 8 }) &&
      deadlineDate < add(firstWeek, { weeks: 9 })
    ) {
      weekNineProcedures.push(procedure);
    } else if (
      deadlineDate >= add(firstWeek, { weeks: 9 }) &&
      deadlineDate < add(firstWeek, { weeks: 10 })
    ) {
      weekTenProcedures.push(procedure);
    } else if (
      deadlineDate >= add(firstWeek, { weeks: 10 }) &&
      deadlineDate < add(firstWeek, { weeks: 11 })
    ) {
      weekElevenProcedures.push(procedure);
    } else if (deadlineDate >= add(firstWeek, { weeks: 11 })) {
      weekTwelveProcedures.push(procedure);
    } else {
      new Error("想定外の予定が入っているかも！");
    }
    //else {
    //   throw new Error("week16以降のTODOがあります。実装を確認しましょう！");
    // }
  });
  return [
    weekOneProcedures,
    weekSixProcedures,
    weekSevenProcedures,
    weekEightProcedures,
    weekNineProcedures,
    weekTenProcedures,
    weekElevenProcedures,
    weekTwelveProcedures,
  ];
};
