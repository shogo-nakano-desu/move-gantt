import { splittedProcedures } from "./splitProcedures";
import {
  dummy_moveNotification,
  dummy_car,
  dummy_rentalCAN,
  dummy_gasTapStop,
} from "../info/procedures";

test("split some procedures by week", () => {
  expect(splittedProcedures()).toEqual({
    weekOneProcedures: [dummy_rentalCAN], // 8/6から１週間
    weekTwoProcedures: [], // 8/13-19
    weekThreeProcedures: [], // 8/20-26
    weekFourProcedures: [], // 8/27-9/2
    weekFiveProcedures: [dummy_gasTapStop], // 9/3-9/9
    weekSixProcedures: [dummy_moveNotification], //9/10-9/16
    weekSevenProcedures: [dummy_car], //9/17-23
    weekEightProcedures: [], //9/23-29
  });
  // 以下のテストは本番環境にあげるときに試せばOK
  // expect(() => splittedProcedures()).toThrow(
  //   "week8以降のTODOがあります。実装を確認しましょう！"
  // );
});
