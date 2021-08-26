import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../../firebaseClient";
import { createNewProject } from "../utils/reducers";

export default function SignOutComponent() {
  const dispatch = useDispatch();
  useEffect(() => {
    const so = async () => {
      await auth.signOut().catch((err) => console.error(err));
      dispatch(createNewProject("", 0, "", ""));
    };
    so();
  }, []);
  return <div>サインアウトしています。</div>;
}
