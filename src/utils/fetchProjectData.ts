// [TODO]方針を変えるのでこのファイルは全部無視することになる
import { db } from "../../firebaseClient";
import { procedures, Procedure } from "../info/procedures";
import { compareWithDeadline } from "./sortProcedures";
import { splittedProcedures } from "./splitProcedures";
//[TODO]1.dashboard.tsxからユーザーIDを取得して置き換える 2.プロジェクトIDを固定値ではなく、選択しているものにする
const docRef = db
  .collection("users")
  .doc("ryclfdVerlYbITo5SODRiJvmgoH3")
  .collection("projects")
  .doc("5dbIDf6Y5RPWHlQ5uM8i");

// 1. fetch data(data type is Object)&chose default TODOS.
export const filteredProjectData = () =>
  docRef
    .get()
    .then((doc) => {
      console.log("Document data: ", doc.data());
      const projectData = doc.data()!;
      // ここにprocedures（array）と比較する関数を作っていく
      if (doc.exists) {
        const myProcedures: Procedure[] = procedures.filter((procedure) => {
          !(projectData.isCar === false && procedure.isCar === true) &&
            !(
              projectData.isDrivingLicense === false &&
              procedure.isDrivingLicense === true
            ) &&
            !(
              projectData.isFireInsurance === false &&
              procedure.isFireInsurance === true
            ) &&
            !(
              projectData.isFixedPhone === false &&
              procedure.isFixedPhone === true
            ) &&
            !(
              projectData.isMynumber === false && procedure.isMynumber === true
            ) &&
            !(projectData.isPet === false && procedure.isPet === true) &&
            !(
              projectData.isScooter === false && procedure.isScooter === true
            ) &&
            !(
              projectData.isNotEmployee === false &&
              procedure.isNotEmployee === true
            ) &&
            !(
              projectData.isStampRegistration === false &&
              procedure.isStampRegistration === true
            ) &&
            !(
              projectData.isStudent === false && procedure.isStudent === true
            ) &&
            !(
              projectData.isUnderFifteen === false &&
              procedure.isUnderFifteen === true
            );
        });
        // return myProcedures;
        return splittedProcedures(myProcedures);
      }
    })
    .catch((error) => {
      new Error(error);
    });
