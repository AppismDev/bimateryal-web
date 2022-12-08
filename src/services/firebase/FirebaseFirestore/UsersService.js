import { getDoc, setDoc, getFirestore } from "firebase/firestore";
import { app } from "../FirebaseConfig";

const firestore = getFirestore(app);

async function saveUserToFirestore() {
  const docRef = await setDoc(doc(firestore, "Users"), {
    first: "Ada",
    last: "Lovelace",
    born: 1815,
  });
}
