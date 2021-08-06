import React from "react";
import { calendarGen } from "../utils/calendarGenerator";
import { getYear, getMonth, getDate } from "date-fns";
import styles from "./Calendar.module.css";

const CalendarBar = () => {
  return (
    <ul>
      {/* calendarGen()では、Date型の配列を返しています。 */}
      {/* やりたいことは、日付をリストで返してリスト先頭の・を消すこと。
      Next.jsでビルトインサポートされているstyled-jsxを使ってみようと思った */}
      {calendarGen().map((date) => {
        if (getDate(date) === 1) {
          return (
            <li
              className={styles.calendarList}
              id={`${getYear(date)}-${getMonth(date)}-${getDate(date)}`}
            >{`${getMonth(date)}/${getDate(date)}`}</li>
          );
        } else {
          return (
            <li
              className={styles.calendarList}
              id={`${getYear(date)}-${getMonth(date)}-${getDate(date)}`}
            >{`${getDate(date)}`}</li>
          );
        }
      })}
      {/* <style jsx>
        {`
          li {
            list-style-type: none;
          }
        `}
      </style> */}
    </ul>
  );
};

export default CalendarBar;
