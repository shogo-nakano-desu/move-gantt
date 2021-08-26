import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { signOut } from "../utils/reducers";
import { auth } from "../../firebaseClient";

export default function Logout() {
  const dispatch = useDispatch();
  useEffect(() => {
    async () => {
      await dispatch(signOut());
      await auth.signOut().catch((err) => console.error(err));
    };
  }, [dispatch]);
  return <div></div>;
}
