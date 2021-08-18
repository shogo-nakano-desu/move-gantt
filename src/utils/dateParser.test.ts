import { dateParser } from "./dateParser";

const testDateA = "2020-10-09";
const testDateB = "2021/08/18";

test("10digit date parsing", () => {
  expect(dateParser(testDateA).getTime()).toEqual(
    new Date(2020, 10, 9).getTime()
  );
  expect(dateParser(testDateB).getTime()).toEqual(
    new Date(2021, 8, 18).getTime()
  );
});
