import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { useDispatch } from "react-redux";

import { auth, provider } from "../../firebase";

export const SignUp = async (
  email: string,
  password: string,
  userName: string | null
) => {
  await auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      user &&
        userName &&
        user.updateProfile({
          displayName: userName,
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(`errorCode: ${errorCode}`);
      console.log(`errorMessage: ${errorMessage}`);
    });
};

export const SignIn = async (email: string, password: string) => {
  await auth
    .signInWithEmailAndPassword(email, password)
    // 以下の処理は多分いらない。
    // .then((userCredential) => {
    //   const user = userCredential.user;
    //   return user;
    // })
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

// 今ログインしているユーザーはだれか確認する
// ↓これはログイン状態を監視しているところが、stateにユーザー情報を入れているから、それを取ったほうがいいかも
export const firebaseUser = () => {
  return auth.currentUser;
};

// SignOut
export const SignOut = () => {
  auth
    .signOut()
    .then(() => {
      window.location.reload();
    })
    .catch((error) => {
      console.log(error);
      const errorCode = error.code;
      console.log(errorCode);
      const errorMessage = error.message;
      console.log(errorMessage);
    });
};
