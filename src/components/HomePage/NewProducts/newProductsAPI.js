import { firestore } from "../../../services/firebase/FirebaseConfig";
import { getDocs, collection, query, limit, orderBy } from "firebase/firestore";

export async function getNewMaterials() {
  const q = query(
    collection(firestore, "Materials"),
    orderBy("createdAt", "desc"),
    limit(9)
  );

  const querySnapshot = await getDocs(q);
  console.log("snapshot is : ", querySnapshot);
  const data = querySnapshot.docs.map((doc) => doc.data());
  return data;
}
