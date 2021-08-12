import React from "react";
import { useSelector } from "react-redux";

import { stateType } from "../../app/reducers";
import MenuAppBar from "../../components/AppBar";
import TodosComponent from "../../components/Todos";
import SignIn from "../sign-in";

const Dashboard = () => {
  const uid = useSelector((state: stateType) => state.user.uid);
  // const email = useSelector((state: stateType) => state.authForm.formEmail);
  return (
    <>
      {uid !== "" ? (
        <>
          <div>
            <MenuAppBar />
          </div>
          <div>
            <TodosComponent />
          </div>
        </>
      ) : (
        <SignIn />
      )}
    </>
  );
};
export default Dashboard;
