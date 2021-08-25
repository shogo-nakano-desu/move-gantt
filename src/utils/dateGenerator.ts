import { getYear, getMonth, getDate } from "date-fns";

export const dateGenerator = (moveDateNum: number) => {
  const moveDate = new Date(moveDateNum);
  const year = "" + getYear(moveDate);
  let month: string | number = getMonth(moveDate) + 1;
  if (month < 10) {
    month = "0" + month;
  } else {
    month = "" + month;
  }
  let date: string | number = getDate(moveDate);
  if (date < 10) {
    date = "0" + date;
  } else {
    date = "" + date;
  }
  return {
    year: year,
    month: month,
    date: date,
  };
};
