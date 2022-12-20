import { firestore } from "../../services/firebase/FirebaseConfig";
import { onSnapshot, collection, query, where } from "firebase/firestore";

var initState = true;
export const listenUserNotifications = (userID, callback) => {
  const notificationsRef = collection(firestore, "Notifications");
  const q = query(notificationsRef, where("userId", "==", userID));
  onSnapshot(q, (querySnapshot) => {
    var notifications = [];
    var isUpdate = false;
    var isDelete = false;
    var isAdd = false;

    querySnapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
        console.log("New notification: ");
        notifications.push(change.doc.data());
        isAdd = true;
      }
      if (change.type === "modified") {
        console.log("Modified notification: ");
        isUpdate = true;
      }
      if (change.type === "removed") {
        console.log("Removed notification: ");
        isDelete = true;
      }
    });
    callback(notifications, initState, isUpdate, isDelete, isAdd);
    initState = false;
  });
};
