import React from "react";

import SignIn from "./sign-in";
import Dashboard from "./[username]/dashboard";
import { auth } from "../../firebase";
import { Login, Logout } from "../utils/auth";

const Home: React.VFC = () => {
  return <>{auth.currentUser ? <Dashboard /> : <SignIn />}</>;
};

export default Home;
