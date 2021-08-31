import * as firebase from "@firebase/rules-unit-testing";
import { initializeTestApp } from "@firebase/rules-unit-testing";
import fs from "fs";
import path from "path";
import { getFirestoreWithAuth, getFirestore } from "./firebaseTesting";

const myId = "user_shogo";
const theirId = "user_someone";

const myAuth = { uid: myId, email: "shogo@gmail.com" };

const USER = "users";
// localhostをデフォルトから書き換えているので、上書きする必要あり
process.env.FIRESTORE_EMULATOR_HOST = "localhost:58080";

// セキュリティルールをロードする
const filePath = path.join(__dirname, "./firestore.rules");
const rules = fs.readFileSync(filePath, "utf8");
const myProjectId = "my-moving-manager-1995";
// Dateを固定しておく
// const dateToUse = new Date(2021, 8, 18) as unknown as string;
// jest.spyOn(global, "Date").mockImplementation(() => dateToUse);

// projectとして登録するmock data
interface testProjectDataType {
  created_at: number;
  isCar: boolean;
  isDrivingLicense: boolean;
  isFireInsurance: boolean;
  isFixedPhone: boolean;
  isMynumber: boolean;
  isNotEmployee: boolean;
  isPet: boolean;
  isScooter: boolean;
  isStampRegistration: boolean;
  isStudent: boolean;
  isUnderFifteen: boolean;
  moveFRomAddress: string;
  moveFromPrefecture: string;
  willMoveAddress: string;
  willMoveDate: number;
  willMovePrefecture: string;
}
const testProjectData: testProjectDataType = {
  created_at: 1631890800000,
  isCar: true,
  isDrivingLicense: true,
  isFireInsurance: false,
  isFixedPhone: false,
  isMynumber: true,
  isNotEmployee: false,
  isPet: false,
  isScooter: false,
  isStampRegistration: false,
  isStudent: true,
  isUnderFifteen: false,
  moveFRomAddress: "江東区",
  moveFromPrefecture: "東京都",
  willMoveAddress: "川崎市",
  willMoveDate: 1630325305729,
  willMovePrefecture: "神奈川県",
};

describe("usersコレクションへの認証付きでのアクセスのみを許可", () => {
  //テスト毎にデータの初期化
  beforeEach(
    async () => await firebase.clearFirestoreData({ projectId: myProjectId })
  );
  // テスト毎にテストルールの読み込み
  beforeEach(
    async () =>
      await firebase.loadFirestoreRules({
        projectId: myProjectId,
        rules: rules,
      })
  );
  // 全テスト完了時にデータ初期化
  afterAll(
    async () => await firebase.clearFirestoreData({ projectId: myProjectId })
  );

  describe("projectsコレクションへの認証付きアクセスを許可", () => {
    it("認証なしでのデータ保存に失敗", async () => {
      const db = firebase
        .initializeTestApp({
          projectId: myProjectId,
        })
        .firestore();
      const doc = db
        .collection("users")
        .doc("user_shogo")
        .collection("projects")
        .doc("testProjectId");
      await firebase.assertFails(doc.set(testProjectData));
    });

    //   test("認証ありでのデータ保存に成功", async () => {
    //     const db = firebase
    //       .initializeTestApp({ projectId: myProjectId, auth: myAuth })
    //       .firestore();
    //     const doc = db
    //       .collection("users")
    //       .doc("user_shogo")
    //       .collection("projects")
    //       .doc("testProjectId");
    //     await firebase.assertFails(doc.set(testProjectData));
    //   });

    test("認証なしでの取得に失敗", async () => {
      const db = firebase
        .initializeTestApp({
          projectId: myProjectId,
        })
        .firestore();
      const doc = db
        .collection("users")
        .doc("user_shogo")
        .collection("projects")
        .doc("testProjectId");
      await firebase.assertFails(doc.get());
    });

    //   test("認証ありでの取得に成功", async () => {
    //     const db = getFirestoreWithAuth();
    //     const doc = db
    //       .collection("users")
    //       .doc("shogo")
    //       .collection("projects")
    //       .doc("testProjectId");
    //     await firebase.assertSucceeds(doc.get());
    //   });
    // });

    // describe("projects以外のコレクションへのアクセス禁止", () => {
    //   test("認証なしでのデータ保存に失敗", async () => {
    //     const db = getFirestore();
    //     const doc = db
    //       .collection("users")
    //       .doc("shogo")
    //       .collection("countries")
    //       .doc("falseProjectId");
    //     await firebase.assertFails(doc.set(testProjectData));
    //   });

    //   test("認証ありでのデータ保存に失敗", async () => {
    //     const db = getFirestoreWithAuth();
    //     const doc = db
    //       .collection("users")
    //       .doc("shogo")
    //       .collection("countries")
    //       .doc("falseProjectId");
    //     await firebase.assertFails(doc.set(testProjectData));
    //   });

    //   test("認証なしでの取得に失敗", async () => {
    //     const db = getFirestore();
    //     const doc = db
    //       .collection("users")
    //       .doc("shogo")
    //       .collection("countries")
    //       .doc("falseProjectId");
    //     await firebase.assertFails(doc.get());
    //   });

    //   test("認証ありでの取得に失敗", async () => {
    //     const db = getFirestoreWithAuth();
    //     const doc = db
    //       .collection("users")
    //       .doc("shogo")
    //       .collection("countries")
    //       .doc("falseProjectId");
    //     await firebase.assertFails(doc.get());
    //   });
  });
});

// describe('Firestore Security Rules', () => {
//   // テスト毎にデータの初期化
//   afterEach(async () => await clearDB())

//   // 全テストが完了したらappを全て削除
//   afterAll(async () => await deleteAppAll())

//   describe('ユーザー', () =>
//     test('読取り', async () => {
//       const currentUserPath = `${USER}/${currentUserUid}`;
//       const receiveUserPath = `${USER}/${receiveUserUid}`;

//       const auth = { uid: currentUserUid }
//       const data = {
//         [currentUserPath]: { name: 'ログインユーザーさん', role: 'admin' },
//         [receiveUserPath]: { name: '読み取られるユーザーさん', role: 'nomal' },
//       }

//       const db = await setup(auth, data);

//       const getFnc = db.doc(receiveCmsUserPath).get();
//       await firebase.assertSucceeds(getFnc);
//     })
//   })
// })
