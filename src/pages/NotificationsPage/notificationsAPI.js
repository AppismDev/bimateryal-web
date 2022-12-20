import { firestore } from "../../services/firebase/FirebaseConfig";
import { updateDoc, collection, doc } from "firebase/firestore";
export async function setNotificationAsReaded(notificationId) {
  const notificationRef = doc(firestore, "Notifications", notificationId);
  await updateDoc(notificationRef, {
    isRead: true,
  });
}
