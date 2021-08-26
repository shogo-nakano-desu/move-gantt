import { dateGenerator } from "./dateGenerator";

const dateToUse = new Date(2021, 8, 18) as unknown as string;
jest.spyOn(global, "Date").mockImplementation(() => dateToUse);

test("today described with string object", () => {
  expect(dateGenerator(1631890800000)).toEqual({
    year: "2021",
    month: "08",
    date: "18",
  });
});
