import { firestore } from "../../services/firebase/FirebaseConfig";

import { getDocs, query, collection, orderBy, where } from "firebase/firestore";
import {
  capitalizeStringFirstLetters,
  decapitalizeStringFirstLetters,
} from "../../utilities/string/stringUtilities";

export async function searchUsers(queryString) {
  const q = query(
    collection(firestore, "Users"),
    where("displayName", ">=", capitalizeStringFirstLetters(queryString)),
    where(
      "displayName",
      "<=",
      capitalizeStringFirstLetters(queryString) + "\uf8ff"
    ),
    orderBy("displayName")
  );

  const querySnapshot = await getDocs(q);
  const users = [];
  querySnapshot.forEach((doc) => {
    users.push({ ...doc.data(), id: doc.id });
  });
  return users;
}

export async function searchCategories(queryString) {
  const q = query(
    collection(firestore, "Categories"),
    where("categoryName", ">=", capitalizeStringFirstLetters(queryString)),
    where(
      "categoryName",
      "<=",
      capitalizeStringFirstLetters(queryString) + "\uf8ff"
    ),
    orderBy("categoryName")
  );

  const querySnapshot = await getDocs(q);
  const categories = [];
  querySnapshot.forEach((doc) => {
    categories.push({ ...doc.data(), id: doc.id });
  });
  return categories;
}

export async function searchMaterials(queryString) {
  const q = query(
    collection(firestore, "Materials"),
    where("name", ">=", capitalizeStringFirstLetters(queryString)),
    where("name", "<=", capitalizeStringFirstLetters(queryString) + "\uf8ff"),
    orderBy("name")
  );

  const querySnapshot = await getDocs(q);
  const materials = [];
  querySnapshot.forEach((doc) => {
    materials.push({ ...doc.data(), id: doc.id });
  });
  return materials;
}

export async function searchSubCategories(queryString) {
  const q = query(
    collection(firestore, "SubCategories"),
    orderBy("name"),
    where("name", "<=", queryString)
  );

  const querySnapshot = await getDocs(q);
  const subCategories = [];
  querySnapshot.forEach((doc) => {
    subCategories.push({ ...doc.data(), id: doc.id });
  });
  return subCategories;
}
