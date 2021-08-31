import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import { auth, provider } from "../../firebaseClient";

const signInGoogle = async () => {
  await auth.signInWithPopup(provider).catch((err: any) => alert(err.message));
};

// 今ログインしているユーザーはだれか確認する
// ↓これはログイン状態を監視しているところが、stateにユーザー情報を入れているから、それを取ったほうがいいかも
export const firebaseUser = () => {
  return auth.currentUser;
};
