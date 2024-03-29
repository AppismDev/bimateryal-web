import { firestore } from "../../services/firebase/FirebaseConfig";
import {
  getDoc,
  query,
  getDocs,
  collection,
  limit,
  where,
} from "firebase/firestore";

export async function getCategoryMaterials(page, categoryId) {
  console.log("getCategoryMaterials page : " + page);
  const q = query(
    collection(firestore, "Materials"),
    where("categoryId", "==", categoryId)
  );

  const querySnapshot = await getDocs(q);
  const materials = [];

  querySnapshot.forEach((doc) => {
    materials.push(doc.data());
  });

  return materials;
}

export async function getSubCategoryMaterials(page, categoryId) {
  const q = query(
    collection(firestore, "Materials"),
    where("subCategoryId", "==", categoryId)
  );
  const querySnapshot = await getDocs(q);
  const materials = [];

  querySnapshot.forEach((doc) => {
    materials.push(doc.data());
  });

  return materials;
}
