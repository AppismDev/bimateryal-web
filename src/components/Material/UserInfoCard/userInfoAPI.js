import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../../services/firebase/FirebaseConfig";

export async function getUserInfo(userId) {
  const response = await getDoc(doc(firestore, "Users", userId));
  return response.data();
}
