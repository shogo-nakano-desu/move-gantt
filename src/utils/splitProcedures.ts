import { LocalConvenienceStoreOutlined } from "@material-ui/icons";
import { add } from "date-fns";
import { procedureType } from "../utils/reducers";

//[TODO]数字がそのままでややこしいのでリファクタリングする必要あり

// sortedProceduresで並び替えたProcedure[] typeの配列を週ごとに切り分ける関数
// trelloのようにレンダリングする際に、該当週の配列だけレンダリングしやすいようにする
// 現在week8までしか実装していないので、week9以降のtodoが見つかった場合には、別途実装する必要がある。いったんエラーを投げるようにしておこう
export const splittedProcedures = (
  procedures: procedureType[],
  moveDate: Date
) => {
  console.log("split procedureが呼ばれた");
  console.log("procedures", procedures); // [TODO]からのものが渡されている
  console.log("moveDate", moveDate);
  const weekOneProcedures: procedureType[] = [];
  const weekSixProcedures: procedureType[] = [];
  const weekSevenProcedures: procedureType[] = [];
  const weekEightProcedures: procedureType[] = [];
  const weekNineProcedures: procedureType[] = [];
  const weekTenProcedures: procedureType[] = [];
  const weekElevenProcedures: procedureType[] = [];
  const weekTwelveProcedures: procedureType[] = [];
  // これはどのイベントを一番最初にするかによって変わってくる
  const fourWeeksBeforeMove = add(moveDate, { weeks: -4 });
  // procedureがどの週にマッピングされるべきか決まる
  procedures.map((procedure: procedureType) => {
    const deadlineDate = new Date(procedure.deadline);
    if (deadlineDate <= fourWeeksBeforeMove) {
      weekOneProcedures.push(procedure);
    } else if (
      deadlineDate > fourWeeksBeforeMove &&
      deadlineDate <= add(fourWeeksBeforeMove, { weeks: 1 })
    ) {
      weekSixProcedures.push(procedure);
    } else if (
      deadlineDate > add(fourWeeksBeforeMove, { weeks: 1 }) &&
      deadlineDate <= add(fourWeeksBeforeMove, { weeks: 2 })
    ) {
      weekSevenProcedures.push(procedure);
    } else if (
      deadlineDate > add(fourWeeksBeforeMove, { weeks: 2 }) &&
      deadlineDate <= add(fourWeeksBeforeMove, { weeks: 3 })
    ) {
      weekEightProcedures.push(procedure);
    } else if (
      deadlineDate > add(fourWeeksBeforeMove, { weeks: 3 }) &&
      deadlineDate <= add(fourWeeksBeforeMove, { weeks: 4 })
    ) {
      weekNineProcedures.push(procedure);
    } else if (
      deadlineDate > add(fourWeeksBeforeMove, { weeks: 4 }) &&
      deadlineDate <= add(fourWeeksBeforeMove, { weeks: 5 })
    ) {
      weekTenProcedures.push(procedure);
    } else if (
      deadlineDate > add(fourWeeksBeforeMove, { weeks: 5 }) &&
      deadlineDate <= add(fourWeeksBeforeMove, { weeks: 6 })
    ) {
      weekElevenProcedures.push(procedure);
    } else if (deadlineDate > add(fourWeeksBeforeMove, { weeks: 6 })) {
      weekTwelveProcedures.push(procedure);
    } else {
      new Error("想定外の予定が入っているかも！");
    }
    console.log("proceduresのsplit完了");
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
