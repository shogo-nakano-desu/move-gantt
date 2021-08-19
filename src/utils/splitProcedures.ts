import { sortedProcedures } from "./sortProcedures";
import { moveDate, Procedure } from "../info/procedures";
import { add } from "date-fns";

// sortedProceduresで並び替えたProcedure[] typeの配列を週ごとに切り分ける関数
// trelloのようにレンダリングする際に、該当週の配列だけレンダリングしやすいようにする
// 現在week8までしか実装していないので、week9以降のtodoが見つかった場合には、別途実装する必要がある。いったんエラーを投げるようにしておこう
export const splittedProcedures = () => {
  const weekOneProcedures: Procedure[] = [];
  // const weekTwoProcedures: Procedure[] = [];
  // const weekThreeProcedures: Procedure[] = [];
  // const weekFourProcedures: Procedure[] = [];
  // const weekFiveProcedures: Procedure[] = [];
  const weekSixProcedures: Procedure[] = [];
  const weekSevenProcedures: Procedure[] = [];
  const weekEightProcedures: Procedure[] = [];
  const weekNineProcedures: Procedure[] = [];
  const weekTenProcedures: Procedure[] = [];
  const weekElevenProcedures: Procedure[] = [];
  const weekTwelveProcedures: Procedure[] = [];

  // [TODO]week2-5がいらない

  // これはどのイベントを一番最初にするかによって変わってくる
  const firstWeek = add(moveDate, { months: -2 });
  const oneMonthBeforeMove = add(moveDate, { months: -1, weeks: 1 });
  // procedureがどの週にマッピングされるべきか決まる
  sortedProcedures.map((procedure: Procedure) => {
    if (
      procedure.deadline >= firstWeek &&
      procedure.deadline < oneMonthBeforeMove
    ) {
      weekOneProcedures.push(procedure);
    }
    // else if (
    //   procedure.deadline >= add(firstWeek, { weeks: 1 }) &&
    //   procedure.deadline < add(firstWeek, { weeks: 2 })
    // ) {
    //   weekTwoProcedures.push(procedure);
    // } else if (
    //   procedure.deadline >= add(firstWeek, { weeks: 2 }) &&
    //   procedure.deadline < add(firstWeek, { weeks: 3 })
    // ) {
    //   weekThreeProcedures.push(procedure);
    // } else if (
    //   procedure.deadline >= add(firstWeek, { weeks: 3 }) &&
    //   procedure.deadline < add(firstWeek, { weeks: 4 })
    // ) {
    //   weekFourProcedures.push(procedure);
    // } else if (
    //   procedure.deadline >= add(firstWeek, { weeks: 4 }) &&
    //   procedure.deadline < add(firstWeek, { weeks: 5 })
    // ) {
    //   weekFiveProcedures.push(procedure);
    // }
    else if (
      procedure.deadline >= add(firstWeek, { weeks: 5 }) &&
      procedure.deadline < add(firstWeek, { weeks: 6 })
    ) {
      weekSixProcedures.push(procedure);
    } else if (
      procedure.deadline >= add(firstWeek, { weeks: 6 }) &&
      procedure.deadline < add(firstWeek, { weeks: 7 })
    ) {
      weekSevenProcedures.push(procedure);
    } else if (
      procedure.deadline >= add(firstWeek, { weeks: 7 }) &&
      procedure.deadline < add(firstWeek, { weeks: 8 })
    ) {
      weekEightProcedures.push(procedure);
    } else if (
      procedure.deadline >= add(firstWeek, { weeks: 8 }) &&
      procedure.deadline < add(firstWeek, { weeks: 9 })
    ) {
      weekNineProcedures.push(procedure);
    } else if (
      procedure.deadline >= add(firstWeek, { weeks: 9 }) &&
      procedure.deadline < add(firstWeek, { weeks: 10 })
    ) {
      weekTenProcedures.push(procedure);
    } else if (
      procedure.deadline >= add(firstWeek, { weeks: 10 }) &&
      procedure.deadline < add(firstWeek, { weeks: 11 })
    ) {
      weekElevenProcedures.push(procedure);
    } else if (
      procedure.deadline >= add(firstWeek, { weeks: 11 }) &&
      procedure.deadline < add(firstWeek, { weeks: 12 })
    ) {
      weekTwelveProcedures.push(procedure);
    } else {
      new Error("想定外の予定が入っているかも！");
    }
    //else {
    //   throw new Error("week16以降のTODOがあります。実装を確認しましょう！");
    // }
  });
  return {
    weekOneProcedures: weekOneProcedures,
    // weekTwoProcedures: weekTwoProcedures,
    // weekThreeProcedures: weekThreeProcedures,
    // weekFourProcedures: weekFourProcedures,
    // weekFiveProcedures: weekFiveProcedures,
    weekSixProcedures: weekSixProcedures,
    weekSevenProcedures: weekSevenProcedures,
    weekEightProcedures: weekEightProcedures,
    weekNineProcedures: weekNineProcedures,
    weekTenProcedures: weekTenProcedures,
    weekElevenProcedures: weekElevenProcedures,
    weekTwelveProcedures: weekTwelveProcedures,
  };
};
