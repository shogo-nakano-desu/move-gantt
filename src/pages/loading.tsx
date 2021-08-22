//[TODO]使わなさそうなので、使わなかった消す
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { auth } from "../../firebaseClient";

export default function LoadingComponent() {
  const router = useRouter();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      user && router.push("/dashboard"); //dispatch(setCurrentUser(user.uid));もしようとしたらダメだった
    });
  }, []);

  return <div>Loading</div>;
}
