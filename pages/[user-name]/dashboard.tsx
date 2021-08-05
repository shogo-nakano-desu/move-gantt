import React from "react";
import MenuAppBar from "../../components/AppBar";
import { sortedProcedures } from "../../utils/sortProcedures";
const dashboard = () => {
  console.log(sortedProcedures);
  return <MenuAppBar />;
};
export default dashboard;
