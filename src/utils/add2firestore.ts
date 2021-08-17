import firebase from "firebase/app";
import "firebase/firestore";

import { db } from "../../firebaseClient";
// // add a new document with a generated id
// const newProjectRef = db.collection("projects").doc();

// // set document to ref
// const addTodo = (todo: todoType) => {
//   newProjectRef.set(todo);
// };

// Date to timeStamp parser
const timeStampParser = (dateTime: Date) => {
  return firebase.firestore.Timestamp.fromDate(dateTime);
};

export const generateTodo = (
  title: string,
  startDate: Date,
  endDate: Date,
  memo: string | undefined
) => {
  return {
    title: title,
    startDate: timeStampParser(startDate),
    endDate: timeStampParser(endDate),
    memo: memo,
    complete_flag: false,
    created_at: Date.now(),
    // 追加でタイムスタンプも送る
  };
};

interface todoType {
  title: string;
  start_date: Date;
  end_date: Date;
  memo: string | undefined;
  complete_flag: boolean;
  created_at: number;
}

const addProject = async () => {
  await db.collection("projects").add({
    UID: user.id,
    title: title,
    move_date: move_date,
    future_address: further_address,
    current_address: current_address,
  });
};

const addTodo = async (
  projectName: string,
  title: string,
  startDate: Date,
  endDate: Date,
  memo: string | undefined
) => {
  await db
    .collection("projects")
    .doc(projectName)
    .collection("todos")
    .doc()
    .set(generateTodo(title, startDate, endDate, memo));
};

/*
データ構造を考える。以下構造で問題ないはず。
- ユーザー
  - プロジェクト
    - タスク
    - タスク
  - プロジェクト
    - タスク
    - タスク
    - タスク
- ユーザー
  - プロジェクト
    - タスク
*/
