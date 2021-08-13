import { calendarGen, moveDate } from "./calendarGenerator";
import { add } from "date-fns";

test("calendar start date and end date", () => {
  expect(calendarGen()[0]).toEqual(add(moveDate, { weeks: -6 }));
  expect(calendarGen()[calendarGen().length - 1]).toEqual(
    add(moveDate, { weeks: 3, days: -1 })
  );
});
