import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import { stateType, setCurrentUser } from "../utils/reducers";
import MenuAppBar from "../components/AppBar";
import TodosComponent from "../components/Todos";
import SignIn from "./sign-in";
import { auth } from "../../firebase";

const Dashboard = () => {
  const uid = useSelector((state: stateType) => state.user.uid);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      user ? dispatch(setCurrentUser(user.uid)) : router.push("/sing-in");
    });
  }, []);

  // SignOut
  const SignOut = async () => {
    try {
      await auth.signOut();
      router.push("/sing-in");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <>
        <div>
          <MenuAppBar />
        </div>
        <div>
          <TodosComponent />
        </div>
      </>
    </>
  );
};
export default Dashboard;
