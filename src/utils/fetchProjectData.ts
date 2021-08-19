import { db } from "../../firebaseClient";

//[TODO]1.dashboard.tsxからユーザーIDを取得して置き換える 2.プロジェクトIDを固定値ではなく、選択しているものにする
const docRef = db
  .collection("users")
  .doc("ryclfdVerlYbITo5SODRiJvmgoH3")
  .collection("projects")
  .doc("hhwFmJMT97MWwVgjGulq");

// 1. fetch data(data type is Object)
export const sampleProjectData = docRef
  .get()
  .then((doc) => {
    if (doc.exists) {
      console.log("Document data: ", doc.data());
    } else {
      // doc.data() will be undefined in this createStore
      console.log("No such document");
    }
  })
  .catch((error) => {
    console.log("Error getting document: ", error);
  });

// 2.filter default todos
/*
フィルターするのにいいアルゴリズムを考える
1. fetchしてきたプロジェクトの中身１個ずつ、array.prototype.filterしていく。
*/
