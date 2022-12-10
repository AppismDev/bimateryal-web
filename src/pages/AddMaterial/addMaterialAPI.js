import { firestore, storage } from "../../services/firebase/FirebaseConfig";
import { collection, addDoc, doc } from "firebase/firestore";
import {
  getDownloadURL,
  ref as sRef,
  uploadBytesResumable,
} from "firebase/storage";

export async function addMaterial({
  categoryId,
  coverImage,
  description,
  location,
  media,
  name,
  ownerUserId,
  price,
  subCategoryId,
}) {
  try {
    const newDocRef = doc(collection(firestore, "Materials"));
    var coverImageUrl = await uploadMaterialMainPhoto(coverImage, newDocRef.id);
    var media = await uploadMaterialMedias(media, newDocRef.id);

    const data = {
      categoryId,
      coverImageUrl: coverImageUrl,
      description,
      location,
      mediaUrls: media,
      name,
      ownerUserId,
      price,
      subCategoryId,
      isActive: true,
      createdAt: new Date(),
      id: newDocRef.id,
    };

    await addDoc(collection(firestore, "Materials"), data);
  } catch (err) {
    console.log(err);
  }
}

async function uploadMaterialMedias(files, materialId) {
  try {
    var imagePaths = [];

    for (var i = 0; i < files.length; i++) {
      const storageRef = sRef(
        storage,
        `materials/${materialId}/media/${files[i].name}`
      );
      const uploadTask = await uploadBytesResumable(storageRef, files[i]);
      const url = await getDownloadURL(storageRef);
      imagePaths.push(url);
    }
    return imagePaths;
  } catch (err) {
    console.log(err);
  }
}

async function uploadMaterialMainPhoto(file, materialId) {
  try {
    const storageRef = sRef(
      storage,
      `materials/${materialId}/mainPhoto/${file.name}`
    );

    const uploadTask = await uploadBytesResumable(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  } catch (err) {
    console.log(err);
  }
}
