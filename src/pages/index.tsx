import React from "react";
import { useSelector } from "react-redux";

import { stateType } from "../app/reducers";
import SignInComponent from "./sign-in";
import Dashboard from "./[username]/dashboard";
import { auth } from "../../firebase";

const Home: React.VFC = () => {
  const userID = useSelector((state: stateType) => state.user.uid);
  return <>{userID ? <Dashboard /> : <SignInComponent />}</>;
};

export default Home;
