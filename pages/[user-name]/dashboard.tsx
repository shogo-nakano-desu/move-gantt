import React from "react";
import MenuAppBar from "../../components/AppBar";
import GanttChart from "../../components/GanttChartBar";
import { sortedProcedures } from "../../utils/sortProcedures";

const dashboard = () => {
  return (
    <React.Fragment>
      <MenuAppBar />
      <GanttChart />
    </React.Fragment>
  );
};
export default dashboard;
