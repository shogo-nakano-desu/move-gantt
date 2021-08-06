import React from "react";
import MenuAppBar from "../../components/AppBar";
import GanttChart from "../../components/GanttChartBar";
import CalendarBar from "../../components/Calendar";

const dashboard = () => {
  return (
    <React.Fragment>
      <MenuAppBar />
      <CalendarBar />
      <GanttChart />
    </React.Fragment>
  );
};
export default dashboard;
