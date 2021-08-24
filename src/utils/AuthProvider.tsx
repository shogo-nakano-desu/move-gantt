// 使った方が楽だった？かもだが、stateで頑張ってしまった。
import { FC, createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import firebase from "firebase/app";

import { auth } from "../../firebaseClient";
import { setCurrentUser, signOut, stateType, userType } from "./reducers";

interface AuthContextProps {
  currentUser: { uid: string; displayName: string | null } | null | undefined;
}
export const AuthContext = createContext<AuthContextProps>({
  currentUser: undefined,
});

export const AuthProvider: FC = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  // const currentUser = useSelector((state: stateType) => state.user);
  const [currentUser, setCurrentUser] = useState<
    { uid: string; displayName: string | null } | null | undefined
  >(undefined);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      // if (user && user.displayName) {
      //   dispatch(setCurrentUser(user.uid, user.displayName));
      // } else if (user) {
      //   dispatch(setCurrentUser(user.uid));
      // } else {
      //   dispatch(setCurrentUser("", ""));
      //   router.push("sign-in");
      // }
      if (user) {
        setCurrentUser({ uid: user.uid, displayName: user.displayName });
        router.push("/dashboard");
      } else {
        setCurrentUser(undefined);
        router.push("/sign-in");
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
