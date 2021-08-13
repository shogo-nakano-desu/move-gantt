import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";

import { stateType, signOut } from "../app/reducers";
import MenuAppBar from "../components/AppBar";
import TodosComponent from "../components/Todos";
import SignIn from "./sign-in";
import { ProtectRoute } from "../components/AuthComponent";
import { auth } from "../../firebase";

export const GetStaticPath = async () => {
  const dispatch = useDispatch();
  const userName = await auth.onAuthStateChanged((authUser) => {
    authUser ? authUser.displayName : dispatch(signOut());
  });
  return {
    paths: [{ params: { username: userName, dashboard: "dashboard" } }],
    fallback: false,
  };
};

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
      <ProtectRoute />
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
