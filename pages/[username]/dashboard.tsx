import React from "react";
import MenuAppBar from "../../components/AppBar";
import GanttChart from "../../components/GanttChartBar";
import CalendarBar from "../../components/Calendar";
import styles from "./dashboard.module.css";
import { calendarGen } from "../../utils/calendarGenerator";

const dashboard = () => {
  const calendarLength = calendarGen.length;
  if (typeof document !== "undefined") {
    const gridBoarder = document.getElementById("scheduleGrid");
    gridBoarder.style.gridTemplateColumns = calendarLength.toString();
  }

  return (
    <>
      <div className={styles.appBar}>
        <MenuAppBar />
      </div>
      <div className={styles.calendarBar}>
        <CalendarBar />
      </div>
      <div>
        <GanttChart />
      </div>
    </>
  );
};
export default dashboard;
