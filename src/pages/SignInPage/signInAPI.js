import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc, getDocs, collection } from "firebase/firestore";

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
        accountProvider: "Google"
    };


    await saveUserToFirestore(usertobeRegistered);

    return usertobeRegistered;
}


async function saveUserToFirestore(
    {
        displayName,
        email,
        photoUrl,
        accountProvider
    }
) {
    console.log("saveUserToFirestore", displayName, email, photoUrl, accountProvider)
    // add doc to firebase 

    // const snapshot = await getDocs(collection(firestore, "Users"));
    const refDoc = doc(firestore, "Users")
    const docRef = await setDoc(doc(firestore, "Users", "1"), {
        displayName,
        email,
        accountProvider
    });

    console.log("Document written with ID: ", docRef.id);



}
