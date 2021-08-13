import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { auth, provider } from "../../firebase";

export const signUp = async (
  email: string,
  password: string,
  userName: string
) => {
  const authUser = await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password);
  await authUser.user?.updateProfile({
    displayName: userName,
  });
};

export const signIn = async (email: string, password: string) => {
  await firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
    })
    .catch(function (error) {
      console.log(error);
      const errorCode = error.code;
      console.log(errorCode);
      const errorMessage = error.message;
      console.log(errorMessage);
    });
};

const signInGoogle = async () => {
  await auth.signInWithPopup(provider).catch((err) => alert(err.message));
};

// ログイン状態の検知
export const listenAuthState = (dispatch: any) => {
  return firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in.
      dispatch({
        type: "SIGN_IN",
        payload: user,
      });
    } else {
      // User is signed out.
      // ...
      dispatch({
        type: "SIGN_OUT",
        payload: "",
      });
    }
  });
};

// 今ログインしているユーザーはだれか確認する
export const firebaseUser = () => {
  return firebase.auth().currentUser;
};

// Logout
export const Logout = () => {
  auth.signOut().then(() => {
    window.location.reload();
  });
};
