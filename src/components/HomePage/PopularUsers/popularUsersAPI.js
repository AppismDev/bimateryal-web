import { firestore } from "../../../services/firebase/FirebaseConfig";
import { query, orderBy, limit, getDocs, collection } from "firebase/firestore";

export async function getPopularUsers() {
  const q = query(
    collection(firestore, "Users"),
    orderBy("points", "desc"),
    limit(5)
  );

  const querySnapshot = await getDocs(q);
  const users = [];

  querySnapshot.forEach((doc) => {
    users.push(doc.data());
  });

  return users;
}
