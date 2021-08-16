import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

import { setCurrentUser } from "../utils/reducers";
import MenuAppBar from "../components/AppBar";
import TodosComponent from "../components/Todos";
import { auth } from "../../firebase";

const Dashboard = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      user ? dispatch(setCurrentUser(user.uid)) : router.push("/sign-in");
    });
  }, []);

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
