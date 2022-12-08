import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../FirebaseConfig";

export default async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

  const result = await signInWithPopup(auth, provider);

  const credential = GoogleAuthProvider.credentialFromResult(result);
  const token = credential.accessToken;

  const user = result.user;
  console.log("Credential: ", credential);
  return user;
}
