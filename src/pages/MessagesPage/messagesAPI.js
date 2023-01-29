import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, query, runTransaction, setDoc, updateDoc, where } from "firebase/firestore";
import { firestore } from "../../services/firebase/FirebaseConfig";


export async function sendMessage(message) {
    try {
        await runTransaction(firestore, async (transaction) => {
            // i have a Collection named Messages. I want to add a new document to this collection. This collection id will be receiver id. under this collection, there will be collection named Inbox. and under this collection, there will be documents named sender id. and under this document, there will be messages.

            // const messageRef = doc(collection(firestore, "Messages", message.receiverId, "Inbox", message.senderId));
            const messagesRef = collection(firestore, "Messages", message.receiverId, "Inbox", message.senderId, "Messages");
            const inboxDoc = doc(messagesRef);


            const messageData = {
                senderId: message.senderId,
                receiverId: message.receiverId,
                content: message.content,
                timestamp: message.timestamp,
                isRead: false,

                id: inboxDoc.id,
                senderName: message.senderName,
                senderPhotoUrl: message.senderPhotoUrl,
            };


            const colref = doc(firestore, "Messages", message.receiverId, "Inbox", message.senderId);
            var documentsnapshot = await transaction.get(colref)
            if (!documentsnapshot.exists()) {
                transaction.set(colref, {
                    lastMessage: message.content,
                    lastMessageTimestamp: message.timestamp,
                    lastMessageSenderId: message.senderId,
                    lastMessageId: inboxDoc.id,
                    senderName: message.senderName,
                    senderPhotoUrl: message.senderPhotoUrl,
                });
            }
            else {
                transaction.update(colref, {
                    lastMessage: message.content,
                    lastMessageTimestamp: message.timestamp,
                    lastMessageSenderId: message.senderId,
                    lastMessageId: inboxDoc.id,
                    senderName: message.senderName,
                    senderPhotoUrl: message.senderPhotoUrl,
                });

            }

            transaction.set(inboxDoc, messageData);

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

        })
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
    console.log("Inbox is fetched ", inboxSnapshot.docs.map((doc) => doc.data()));
    return inbox;
}
export const listenUserInbox = (userID, callback) => {
    const messagesRef = collection(firestore, "Messages", userID, "Inbox");
    onSnapshot(messagesRef, (querySnapshot) => {
        querySnapshot.docChanges().forEach((change) => {

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


// belirli bir görüşmeyi dinleyen stream
export const listenUserMessage = (userID, senderID, callback) => {
    const messagesRef = collection(firestore, "Messages", userID, "Inbox", senderID, "Messages");
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

