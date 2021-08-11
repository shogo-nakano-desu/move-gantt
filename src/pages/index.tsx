import React from "react";

import SignIn from "./sign-in";
import Dashboard from "./[username]/dashboard";
import { Login, Logout, auth } from "../../firebase";

const Home: React.VFC = () => {
  return <>{auth.currentUser ? <Dashboard /> : <SignIn />}</>;
};

export default Home;
