import { addDoc, collection, doc, getDoc, runTransaction, setDoc, updateDoc } from "firebase/firestore";
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
            };


            const colref = doc(firestore, "Messages", message.receiverId, "Inbox", message.senderId);
            var documentsnapshot = await transaction.get(colref)
            if (!documentsnapshot.exists()) {
                transaction.set(colref, {
                    lastMessage: message.content,
                    lastMessageTimestamp: message.timestamp,
                    lastMessageSenderId: message.senderId,
                    lastMessageId: inboxDoc.id,
                });
            }
            else {
                transaction.update(colref, {
                    lastMessage: message.content,
                    lastMessageTimestamp: message.timestamp,
                    lastMessageSenderId: message.senderId,
                    lastMessageId: inboxDoc.id,
                });

            }

            transaction.set(inboxDoc, messageData);

        })
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}