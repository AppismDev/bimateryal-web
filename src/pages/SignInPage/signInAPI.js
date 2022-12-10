import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc, getDocs, collection, addDoc } from "firebase/firestore";

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
  };

  await saveUserToFirestore(usertobeRegistered);
  saveUserToCache(usertobeRegistered);
  return usertobeRegistered;
}

async function saveUserToFirestore({
  displayName,
  email,
  photoUrl,
  accountProvider,
  fcmToken,
  activeAddressId,
}) {
  // add doc to firebase

  // const snapshot = await getDocs(collection(firestore, "Users"));
  try {
    const newDocRef = doc(collection(firestore, "Users"));
    await setDoc(newDocRef, {
      displayName,
      email,
      fcmToken: fcmToken || null,
      activeAddressId: activeAddressId || null,
      photoUrl: photoUrl || null,
      uid: newDocRef.id,
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
