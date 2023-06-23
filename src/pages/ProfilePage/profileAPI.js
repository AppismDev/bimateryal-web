import { firestore } from "../../services/firebase/FirebaseConfig";
import { collection, where, getDocs, query } from "firebase/firestore";
export async function getActiveMaterialPosts(userID) {
  const activeMaterialPosts = [];
  const activeMaterialPostsRef = collection(firestore, "Materials");
  console.log("user id is ", userID);
  const q = query(
    activeMaterialPostsRef,
    where("ownerUserId", "==", userID),
    where("isActive", "==", true)
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    activeMaterialPosts.push(doc.data());
  });
  return activeMaterialPosts;
}
