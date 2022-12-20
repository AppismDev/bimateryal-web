import {
  collection,
  doc,
  setDoc,
  where,
  query,
  getDocs,
  getDoc,
  updateDoc,
  runTransaction,
  increment,
} from "firebase/firestore";
import { firestore } from "../../services/firebase/FirebaseConfig";
export async function requestMaterial({
  materialId,
  ownerId,
  requestorId,
  description,
  price,
  addressId,
  materialName,
}) {
  runTransaction(firestore, async (transaction) => {
    const requestRef = doc(collection(firestore, "Requests"));
    const request = {
      materialId,
      ownerId,
      requestorId,
      description,
      price,
      status: "pending",
      requestDate: new Date(),
      addressID: addressId || null,
      id: requestRef.id,
    };

    transaction.set(requestRef, request);
    // send notification
    const notificationRef = doc(collection(firestore, "Notifications"));
    const notification = {
      userId: ownerId,
      senderId: requestorId,
      title: "Yeni Talep İsteği",
      description: `"${materialName}" ilanınıza yeni bir talep isteği var.`,
      type: "request",
      createdAt: new Date(),
      isRead: false,
      id: notificationRef.id,
      payload: {
        requestedMaterialId: materialId,
        requestorId: requestorId,
      },
    };
    transaction.set(notificationRef, notification);

    const requestorUserRef = doc(firestore, "Users", requestorId);
    transaction.update(requestorUserRef, {
      points: increment(-parseInt(price)),
    });
  });
}

export async function getMaterialRequests(materialId) {
  const requests = [];
  const q = query(
    collection(firestore, "Requests"),
    where("materialId", "==", materialId),
    where("status", "!=", "rejected")
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    requests.push(doc.data());
  });

  return requests;
}

export async function getMaterialById(materialId) {
  const materialRef = doc(firestore, "Materials", materialId);
  const materialDoc = await getDoc(materialRef);
  console.log(materialDoc.data());
  if (materialDoc.exists()) {
    return materialDoc.data();
  } else {
    return null;
  }
}

export async function rejectMaterialRequest({
  requestId,
  materialId,
  ownerId,
  requestorId,
  materialName,
  materialPrice,
}) {
  runTransaction(firestore, async (transaction) => {
    const requestRef = doc(firestore, "Requests", requestId);
    transaction.update(requestRef, {
      status: "rejected",
    });

    const notificationRef = doc(collection(firestore, "Notifications"));
    const notification = {
      userId: requestorId,
      senderId: ownerId,
      title: "Talep İsteği Reddedildi",
      description: `"${materialName}" ilanınızın talebi reddedildi.`,
      type: "request",
      createdAt: new Date(),
      isRead: false,
      id: notificationRef.id,
      payload: {
        requestedMaterialId: materialId,
        requestorId: requestorId,
      },
    };
    transaction.set(notificationRef, notification);

    const userRef = doc(firestore, "Users", requestorId);

    transaction.update(userRef, {
      points: increment(parseInt(materialPrice)),
    });

    // send a notification to user
    // const notificationRef = doc(collection(firestore, "Notifications"));
    // const notification = {
    //   userId: requestorId,
    //   senderId: ownerId,
    //   title: "Talep İsteği Reddedildi",
    //   description: `"${materialName}" ilanına göndermiş olduğunuz talep reddedildi.`,
    //   type: "request_rejected",
    //   createdAt: new Date(),
    //   isRead: false,
    //   id: notificationRef.id,
    //   payload: {
    //     requestedMaterialId: materialId,
    //     requestorId: requestorId,
    //   },
    // };
    // await setDoc(notificationRef, notification);
  });
}

export async function approveMaterialRequest({
  requestId,
  materialId,
  ownerId,
  requestorId,
  materialName,
  materialPrice,
}) {
  runTransaction(firestore, async (transaction) => {
    const requestRef = doc(firestore, "Requests", requestId);
    transaction.update(requestRef, {
      status: "approved",
    });

    const q = query(
      collection(firestore, "Requests"),
      where("materialId", "==", materialId),
      where("status", "==", "pending")
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      if (doc.id !== requestId) {
        transaction.update(doc.ref, {
          status: "rejected",
        });
      }
    });

    const materialRef = doc(firestore, "Materials", materialId);
    transaction.update(materialRef, {
      status: "completed",
    });

    const notificationRef = doc(collection(firestore, "Notifications"));
    const notification = {
      userId: requestorId,
      senderId: ownerId,
      title: "Talep İsteği Kabul Edildi",
      description: `"${materialName}" ilanınızın talebi kabul edildi.`,
      type: "request",
      createdAt: new Date(),
      isRead: false,
      id: notificationRef.id,
      payload: {
        requestedMaterialId: materialId,
        requestorId: requestorId,
      },
    };
    transaction.set(notificationRef, notification);

    const userRef = doc(firestore, "Users", ownerId);

    transaction.update(userRef, {
      points: increment(parseInt(materialPrice)),
      earnedPoints: increment(parseInt(materialPrice)),
    });

    // send a notification to user
    // const notificationRef = doc(collection(firestore, "Notifications"));
    // const notification = {
    //   userId: requestorId,
    //   senderId: ownerId,
    //   title: "Talep İsteği Reddedildi",
    //   description: `"${materialName}" ilanına göndermiş olduğunuz talep reddedildi.`,
    //   type: "request_rejected",
    //   createdAt: new Date(),
    //   isRead: false,
    //   id: notificationRef.id,
    //   payload: {
    //     requestedMaterialId: materialId,
    //     requestorId: requestorId,
    //   },
    // };
    // await setDoc(notificationRef, notification);
  });
}
