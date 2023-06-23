import { firestore } from "../../services/firebase/FirebaseConfig";
import { getDocs, collection } from "firebase/firestore";
export async function getCategories() {
  try {
    const categories = await getDocs(collection(firestore, "Categories"));

    return categories.docs.map((doc) => doc.data());
  } catch (error) {
    console.log("Error getting documents: ", error);
  }
}

export async function getSubcategories() {
  try {
    const subcategories = await getDocs(collection(firestore, "SubCategories"));
    return subcategories.docs.map((doc) => doc.data());
  } catch (error) {
    console.log("Error getting documents: ", error);
  }
}

export async function getSubcategoriesByCategory(category) {
  const subcategories = await getDocs(collection(firestore, "SubCategories"));
  return subcategories.docs.map((doc) => doc.data());
}
