// 使った方が楽だった？かもだが、stateで頑張ってしまった。
import { FC, createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import firebase from "firebase";

import { auth } from "../../firebaseClient";

interface AuthContextProps {
  currentUser: { uid: string; displayName: string | null } | null | undefined;
}
export const AuthContext = createContext<AuthContextProps>({
  currentUser: undefined,
});

export const AuthProvider: FC = ({ children }) => {
  const router = useRouter();

  const [currentUser, setCurrentUser] = useState<
    { uid: string; displayName: string | null } | null | undefined
  >(undefined);

  useEffect(() => {
    auth.onAuthStateChanged((user: firebase.User) => {
      if (user) {
        setCurrentUser({ uid: user.uid, displayName: user.displayName });
        router.push("/dashboard");
      } else {
        setCurrentUser(undefined);

        router.push("/auth");
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
