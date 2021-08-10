import React from "react";
import MenuAppBar from "../../components/AppBar";
import TodosComponent from "../../components/Todos";

const Dashboard = () => {
  // const calendarLength = calendarGen.length;
  // if (typeof document !== "undefined") {
  //   const gridBoarder = document.getElementById("scheduleGrid");
  //   gridBoarder.style.gridTemplateColumns = calendarLength.toString();
  // }

  return (
    <>
      <div>
        <MenuAppBar />
      </div>
      <div>
        <TodosComponent />
      </div>
    </>
  );
};
export default Dashboard;
