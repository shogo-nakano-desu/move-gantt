import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

import { stateType } from "../../app/reducers";
import MenuAppBar from "../../components/AppBar";
import TodosComponent from "../../components/Todos";
import SignIn from "../sign-in";

const Dashboard = () => {
  const uid = useSelector((state: stateType) => state.user.uid);
  const router = useRouter();

  useEffect(() => {
    if (uid === "") {
      router.push("/sign-in");
    }
  });

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
