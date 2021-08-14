import { FC, createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { auth } from "../../firebase";
import { setCurrentUser, stateType, userType } from "./reducers";

type AuthContextProps = {
  currentUser: userType | null | undefined;
};

const AuthContext = createContext<AuthContextProps>({ currentUser: undefined });

const AuthProvider: FC = ({ children }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: stateType) => state.user);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user && user.displayName) {
        dispatch(setCurrentUser(user.uid, user.displayName));
      } else if (user) {
        dispatch(setCurrentUser(user.uid));
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
