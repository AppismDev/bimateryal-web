import {
  doc,
  setDoc,
  getDocs,
  collection,
  addDoc,
  query,
  where,
} from "firebase/firestore";

import { firestore } from "../firebase/FirebaseConfig";

export async function getUserFromFirestore(uid) {
  // get doc from firebase with uid
  const q = query(collection(firestore, "Users"), where("uid", "==", uid));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.docs.length == 0) {
    return undefined;
  }
  return querySnapshot.docs[0].data();
}
