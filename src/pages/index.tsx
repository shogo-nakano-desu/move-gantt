import React from "react";

import SignIn from "./sign-in";
import SignUp from "./sign-up";
import Dashboard from "./[username]/dashboard";
import { auth } from "../../firebase";

const Home: React.VFC = () => {
  return <>{auth.currentUser ? <Dashboard /> : <SignIn />}</>;
};

export default Home;
