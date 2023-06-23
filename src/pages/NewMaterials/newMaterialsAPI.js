import { getDocs, query, orderBy, collection } from "firebase/firestore";
import { firestore } from "../../services/firebase/FirebaseConfig";

export async function getAllNewMaterials() {
  // simulate low speed network
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const q = query(
    collection(firestore, "Materials"),
    orderBy("createdAt", "desc")
  );

  const querySnapshot = await getDocs(q);
  const materials = [];

  querySnapshot.forEach((doc) => {
    materials.push(doc.data());
  });

  return materials;
}
