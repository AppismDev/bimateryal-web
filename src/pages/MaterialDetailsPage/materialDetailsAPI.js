import {
  collection,
  doc,
  setDoc,
  where,
  query,
  getDocs,
  getDoc,
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
  const requestRef = doc(collection(firestore, "Requests"));
  const request = {
    materialId,
    ownerId,
    requestorId,
    description,
    price,
    isAccepted: false,
    requestDate: new Date(),
    addressID: addressId || null,
    id: requestRef.id,
  };

  await setDoc(requestRef, request);
  // check is added succesfully
  // send notification to user
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
  await setDoc(notificationRef, notification);
}

export async function getMaterialRequests(materialId) {
  const requests = [];
  const q = query(
    collection(firestore, "Requests"),
    where("materialId", "==", materialId)
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
