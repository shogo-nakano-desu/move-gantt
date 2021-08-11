import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { auth } from "../../firebase";

export const SignUp = (email: string, password: string) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
};

export const Login = (email: string, password: string) => {
  firebase
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

// ログイン状態の検知
export const listenAuthState = (dispatch: any) => {
  return firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in.
      dispatch({
        type: "SIGN_IN",
        payload: { user: user, isSignIn: true },
      });
    } else {
      // User is signed out.
      // ...
      dispatch({
        type: "SIGN_OUT",
        payload: { siSignIn: false },
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
