import { firestore, storage } from "../../services/firebase/FirebaseConfig";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import {
  getDownloadURL,
  ref as sRef,
  uploadBytesResumable,
} from "firebase/storage";

export async function addMaterial(material) {
  try {
    const newDocRef = doc(collection(firestore, "Materials"));
    var coverImageUrl = await uploadMaterialMainPhoto(
      material.coverImage,
      newDocRef.id
    );

    var media = await uploadMaterialMedias(material.media, newDocRef.id);

    const data = {
      categoryId: material.categoryId,
      coverImageUrl: coverImageUrl,
      description: material.description,
      location: material.location,
      mediaUrls: media,
      name: material.name,
      ownerUserId: material.ownerUserId,
      price: material.price,
      subCategoryId: material.subCategoryId,
      isActive: true,
      status: "pending",
      createdAt: new Date(),
      id: newDocRef.id,
    };

    await setDoc(newDocRef, data);
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
