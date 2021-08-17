import React from "react";
import { useSelector } from "react-redux";

import { stateType } from "../utils/reducers";
import SignInComponent from "./sign-in";
import Dashboard from "./dashboard";
import { auth } from "../../firebaseClient";

const Home: React.VFC = () => {
  const userID = useSelector((state: stateType) => state.user.uid);
  return <>{userID ? <Dashboard /> : <SignInComponent />}</>;
};

export default Home;
