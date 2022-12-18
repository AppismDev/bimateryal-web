import { firestore } from "../../services/firebase/FirebaseConfig";
import { onSnapshot, collection, query, where } from "firebase/firestore";

var initState = true;
export const listenUserNotifications = (userID, callback) => {
  const notificationsRef = collection(firestore, "Notifications");
  const q = query(notificationsRef, where("userId", "==", userID));
  onSnapshot(q, (querySnapshot) => {
    var notifications = [];

    querySnapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
        console.log("New notification: ");
        notifications.push(change.doc.data());
      }
      if (change.type === "modified") {
        console.log("Modified notification: ");
      }
      if (change.type === "removed") {
        console.log("Removed notification: ");
      }
    });
    callback(notifications, initState);
    initState = false;
  });
};
