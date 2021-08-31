import React, { useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";

import { db } from "../../firebaseClient";
import { stateType, createNewProject } from "../utils/reducers";
import { AuthContext, AuthProvider } from "../utils/authProvider";
import { procedures, filteredTodos } from "../utils/loadingFuncs";

export default function LoadingComponent() {
  const router = useRouter();
  const projectId = useSelector((state: stateType) => state.project.projectId);
  const moveDate = useSelector(
    (state: stateType) => state.projectForm.formWillMoveDate
  );

  const proceduresArray = procedures(moveDate);

  const currentUser = useContext(AuthContext);
  //const userId = currentUser.currentUser!.uid;
  // firestoreに新規プロジェクトを作成するための関数群
  const willMovePrefecture = useSelector(
    (state: stateType) => state.projectForm.formWillMovePrefecture
  );
  const willMoveAddress = useSelector(
    (state: stateType) => state.projectForm.formWillMoveAddress
  );
  const moveFromPrefecture = useSelector(
    (state: stateType) => state.projectForm.formMoveFromPrefecture
  );
  const moveFromAddress = useSelector(
    (state: stateType) => state.projectForm.formMoveFromAddress
  );
  const willMoveDate = useSelector(
    (state: stateType) => state.projectForm.formWillMoveDate
  );
  const isNotEmployee = useSelector(
    (state: stateType) => state.projectForm.formIsNotEmployee
  );
  const isStudent = useSelector(
    (state: stateType) => state.projectForm.formIsStudent
  );
  const isPet = useSelector((state: stateType) => state.projectForm.formIsPet);
  const isScooter = useSelector(
    (state: stateType) => state.projectForm.formIsScooter
  );
  const isCar = useSelector((state: stateType) => state.projectForm.formIsCar);
  const isUnderFifteen = useSelector(
    (state: stateType) => state.projectForm.formIsUnderFifteen
  );
  const isFireInsurance = useSelector(
    (state: stateType) => state.projectForm.formIsFireInsurance
  );
  const isFixedPhone = useSelector(
    (state: stateType) => state.projectForm.formIsFixedPhone
  );
  const isMynumber = useSelector(
    (state: stateType) => state.projectForm.formIsMynumber
  );
  const isStampRegistration = useSelector(
    (state: stateType) => state.projectForm.formIsStampRegistration
  );
  const isDrivingLicense = useSelector(
    (state: stateType) => state.projectForm.formIsDrivingLicense
  );
  const isParking = useSelector(
    (state: stateType) => state.projectForm.formIsParking
  );

  const filteredTodosArray = filteredTodos(
    proceduresArray,
    isCar,
    isDrivingLicense,
    isFireInsurance,
    isFixedPhone,
    isMynumber,
    isPet,
    isScooter,
    isNotEmployee,
    isStampRegistration,
    isStudent,
    isUnderFifteen,
    isParking
  );

  useEffect(() => {
    async function putAlltodos() {
      const userId = currentUser.currentUser!.uid;
      for (let i: number = 0; i < filteredTodos.length; i++) {
        db.collection("users")
          .doc(userId)
          .collection("projects")
          .doc(projectId)
          .collection("todos")
          .add(filteredTodosArray[i])
          .catch((error: any) => {
            console.error("Error adding document: ", error);
          });
      }
    }
    putAlltodos();
    //dispatch(createNewProject(projectId));
    console.log("project stateの初期化完了");
    router.push("/dashboard");
  }, []);

  return <div>Loading</div>;
}
