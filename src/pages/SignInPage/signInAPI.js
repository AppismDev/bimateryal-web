import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {
  doc,
  setDoc,
  getDocs,
  collection,
  addDoc,
  query,
  where,
} from "firebase/firestore";

import { getUserFromFirestore } from "../../services/firebase/UserService.js";

import { auth, firestore } from "../../services/firebase/FirebaseConfig";

export default async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();

  const result = await signInWithPopup(auth, provider);

  const credential = GoogleAuthProvider.credentialFromResult(result);
  const user = result.user;
  console.log("user: ", user);

  const usertobeRegistered = {
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
    accountProvider: "Google",
    fcmToken: null,
    activeAddressId: null,
    points: 0,
    earnedPoints: 0,
    uid: user.uid,
    createdAt: new Date(),
  };

  // eğer kullanıcı undf değilse kayıtlı demektir
  var userFromFirebase = await getUserFromFirestore(user.uid);

  if (userFromFirebase == undefined) {
    await saveUserToFirestore(usertobeRegistered);
    saveUserToCache(usertobeRegistered);
    return usertobeRegistered;
  } else {
    saveUserToCache(userFromFirebase);
    return userFromFirebase;
  }
}

async function saveUserToFirestore({
  displayName,
  email,
  photoURL,
  accountProvider,
  fcmToken,
  uid,
  activeAddressId,
  createdAt,
  earnedPoints,
}) {
  // add doc to firebase

  // const snapshot = await getDocs(collection(firestore, "Users"));
  try {
    // const newDocRef = doc(collection(firestore, "Users"));

    await setDoc(doc(firestore, "Users", uid), {
      displayName,
      email,
      fcmToken: fcmToken || null,
      activeAddressId: activeAddressId || null,
      photoUrl: photoURL || null,
      uid: uid,
      earnedPoints,
      createdAt,
      accountProvider,
      points: 0,
    });
  } catch (err) {
    console.log("ERROR in saveUserToFirestore: ", err);
  }
}

function saveUserToCache(user) {
  try {
    localStorage.setItem("user", JSON.stringify(user));
  } catch (error) {
    console.log("ERROR in saveUserToCache: ", error);
  }
}
