//[TODO]インデックス丸ごといらないのだが。。。。
import React, { useContext } from "react";

import SignInComponent from "./auth";
import Dashboard from "./dashboard";
import { AuthContext } from "../utils/authProvider";

const Home: React.VFC = () => {
  const currentUser = useContext(AuthContext);
  return <>{currentUser.currentUser ? <Dashboard /> : <SignInComponent />}</>;
};

export default Home;
