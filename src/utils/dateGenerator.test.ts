import { dateGenerator } from "./dateGenerator";

test("today described with string object", () => {
  expect(dateGenerator()).toEqual({ year: "2021", month: "08", date: "13" });
});
