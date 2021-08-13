import { auth } from "../../firebase";
import { Provider, useDispatch } from "react-redux";
import React, { useEffect } from "react";

import { useStore, signIn, signOut } from "../app/reducers";

// subscribe user
// 以下の処理は、contextを使って各ページで必要なところを跨いで実行できるようにしたい。
export const ProtectRoute = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // ここでログイン状態を監視している
    const unSub = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("unsubがsign-inしているとみたタイミング");
        if (user.displayName) {
          dispatch(signIn(user.uid, user.displayName));
        } else {
          dispatch(signIn(user.uid));
        }
      } else {
        dispatch(signOut());
        console.log("sign-outしたタイミング");
      }
    });
    return () => {
      unSub();
    };
  }, [dispatch]);
  return null;
};
