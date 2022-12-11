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

import { auth, firestore } from "../../services/firebase/FirebaseConfig";

export default async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();

  const result = await signInWithPopup(auth, provider);

  const credential = GoogleAuthProvider.credentialFromResult(result);
  const token = credential.accessToken;

  const user = result.user;
  const usertobeRegistered = {
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
    accountProvider: "Google",
    fcmToken: null,
    activeAddressId: null,
    uid: user.uid,
    createdAt: new Date(),
  };

  // eğer kullanıcı undf değilse kayıtlı demektir
  var userFromFirebase = await getUserFromFirestore(user.uid);
  console.log("userFromFirebase: ", userFromFirebase);

  if (userFromFirebase == undefined) {
    await saveUserToFirestore(usertobeRegistered);
    saveUserToCache(usertobeRegistered);
    return usertobeRegistered;
  } else {
    saveUserToCache(userFromFirebase);
    return userFromFirebase;
  }
}

async function getUserFromFirestore(uid) {
  // get doc from firebase with uid
  const q = query(collection(firestore, "Users"), where("uid", "==", uid));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.docs.length == 0) {
    return undefined;
  }
  return querySnapshot.docs[0].data();
}

async function saveUserToFirestore({
  displayName,
  email,
  photoUrl,
  accountProvider,
  fcmToken,
  uid,
  activeAddressId,
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
      photoUrl: photoUrl || null,
      uid: uid,
      accountProvider,
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
