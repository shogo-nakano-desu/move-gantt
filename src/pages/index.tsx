import React from "react";
import { useAppSelector } from "../app/store";
import { selectUser } from "../features/user/userSlice";
import SignIn from "./sign-in";
import Dashboard from "./[username]/dashboard";

const Index: React.VFC = () => {
  const user = useAppSelector(selectUser);
  return <>{user.uid ? <Dashboard /> : <SignIn />}</>;
};

export default Index;
