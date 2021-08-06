import { getYear, getMonth, getDate } from "date-fns";

export const dateGenerator = () => {
  const today = new Date();
  const year = "" + getYear(today);
  let month: string | number = getMonth(today) + 1;
  if (month < 10) {
    month = "0" + month;
  } else {
    month = "" + month;
  }
  let date: string | number = getDate(today);
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
