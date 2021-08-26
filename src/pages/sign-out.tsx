import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { auth } from "../../firebaseClient";
import { createNewProject } from "../utils/reducers";

export default function SignOutComponent() {
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    const so = async () => {
      await auth.signOut().catch((err) => console.error(err));
      dispatch(createNewProject("", 0, "", ""));
      router.push("/auth");
    };
    so();
  }, []);
  return <div>サインアウトしています。</div>;
}
