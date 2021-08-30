import * as firebase from "@firebase/rules-unit-testing";

const projectId = `rules-test-${Date.now()}`;
interface Auth {
  uid: string;
  email?: string;
}
interface DataValue {
  [key: string]: any;
}
interface Data {
  [ke: string]: DataValue;
}

const addMockData = async (data: Data) => {
  const adminApp = firebase.initializeAdminApp({ projectId });
  const adminDB = adminApp.firestore();
  for (const key in data) {
    const ref = adminDB.doc(key);
    await ref.set(data[key]);
  }
};

// 認証付きfirestore clientの取得
export const getFirestoreWithAuth = (auth?: Auth, data?: Data) => {
  const app = firebase.initializeTestApp({
    projectId,
    auth,
  });

  // モックデータが有ればAdminAppを使って流し込む
  data && addMockData(data);

  return app.firestore();
};

// 認証なしfirestore clientの取得
export const getFirestore = (data?: Data) => {
  const app = firebase.initializeTestApp({ projectId });
  // モックデータが有ればAdminAppを使って流し込む
  data && addMockData(data);

  return app.firestore();
};

// アプリの全削除
export const deleteAppAll = () => {
  Promise.all(firebase.apps().map((app) => app.delete()));
};

// データベースの初期化
export const clearDB = () => {
  firebase.clearFirestoreData({ projectId });
};
