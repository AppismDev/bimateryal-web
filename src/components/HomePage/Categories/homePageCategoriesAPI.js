import { firestore } from "../../../services/firebase/FirebaseConfig";
import { query, orderBy, limit, getDocs, collection } from "firebase/firestore";

export async function getTopFiveCategories() {
  const q = query(
    collection(firestore, "Categories"),
    orderBy("materialCount", "desc"),
    limit(5)
  );

  const querySnapshot = await getDocs(q);
  const categories = [];

  querySnapshot.forEach((doc) => {
    categories.push(doc.data());
  });

  return categories;
}
