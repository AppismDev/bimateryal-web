import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  runTransaction,
  setDoc,
  orderBy,
  updateDoc,
  where,
} from "firebase/firestore";
import { firestore } from "../../services/firebase/FirebaseConfig";

export async function sendMessage(message) {
  try {
    await runTransaction(firestore, async (transaction) => {
      const inboxRef = doc(
        firestore,
        "Messages",
        message.receiverId,
        "Inbox",
        message.senderId
      );

      const myInboxRef = doc(
        firestore,
        "Messages",
        message.senderId,
        "Inbox",
        message.receiverId
      );

      const messageData = {
        senderId: message.senderId,
        receiverId: message.receiverId,
        text: message.content,
        createdAt: message.timestamp,
        isRead: false,

        id: inboxRef.id,
      };

      transaction.set(inboxRef, {
        lastMessageTime: Timestamp.now(),
        uid: message.senderId,
        lastMessage: {
          createdAt: Timestamp.now(),
          id: "",
          media: null,
          senderId: message.senderId,
          receiverId: message.receiverId,
          text: message.content,
        },
      });

      transaction.set(myInboxRef, {
        lastMessageTime: Timestamp.now(),
        uid: message.receiverId,
        lastMessage: {
          createdAt: Timestamp.now(),
          id: "",
          media: null,
          senderId: message.senderId,
          receiverId: message.receiverId,
          text: message.content,
        },
      });

      const chatsDocRef = doc(
        collection(
          firestore,
          "Messages",
          message.receiverId,
          "Inbox",
          message.senderId,
          "Chats"
        )
      );

      const otherChatsDocRef = doc(
        collection(
          firestore,
          "Messages",
          message.senderId,
          "Inbox",
          message.receiverId,
          "Chats"
        )
      );

      transaction.set(chatsDocRef, messageData);

      transaction.set(otherChatsDocRef, messageData);

      const notificationRef = doc(collection(firestore, "Notifications"));
      const notification = {
        userId: message.receiverId,
        senderId: message.senderId,
        title: "Yeni Mesaj",
        description: `Yeni bir mesajınız var.`,
        type: "message",
        createdAt: new Date(),
        isRead: false,
        id: notificationRef.id,
        payload: {
          messageContent: message.content,
          senderId: message.senderId,
        },
      };
      transaction.set(notificationRef, notification);
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function getInbox(id) {
  const inboxRef = collection(firestore, "Messages", id, "Inbox");
  const inboxSnapshot = await getDocs(inboxRef);
  const inbox = inboxSnapshot.docs.map((doc) => doc.data());
  console.log(
    "Inbox is fetched ",
    inboxSnapshot.docs.map((doc) => doc.data())
  );
  return inbox;
}

export const listenUserInbox = (userID, callback) => {
  const messagesRef = collection(firestore, "Messages", userID, "Inbox");
  onSnapshot(messagesRef, (querySnapshot) => {
    console.log(querySnapshot.docs);
    callback(querySnapshot.docs.map((doc) => doc.data()));

    // querySnapshot.docs().forEach((change) => {
    //   console.log("change is ", change);
    //   // callback(change.doc.data());
    // });
  });
};

export const listenUserChatWithAnotherUser = (
  userID,
  otherUserID,
  callback
) => {
  const messagesRef = query(
    collection(firestore, "Messages", userID, "Inbox", otherUserID, "Chats"),
    orderBy("createdAt")
  );
  onSnapshot(messagesRef, (querySnapshot) => {
    callback(querySnapshot.docs.map((doc) => doc.data()));

    // querySnapshot.docs().forEach((change) => {
    //   console.log("change is ", change);
    //   // callback(change.doc.data());
    // });
  });
};

// belirli bir görüşmeyi dinleyen stream
export const listenUserMessage = (userID, senderID, callback) => {
  const messagesRef = collection(
    firestore,
    "Messages",
    userID,
    "Inbox",
    senderID,
    "Messages"
  );
  onSnapshot(messagesRef, (querySnapshot) => {
    querySnapshot.docChanges().forEach((change) => {
      console.log("inbox change", change.doc.data());
      if (change.type === "added") {
        callback(change.doc.data());
      }
      if (change.type === "modified") {
        callback(change.doc.data());
      }
      if (change.type === "removed") {
        callback(change.doc.data());
      }
    });
  });
};
