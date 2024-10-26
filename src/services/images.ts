import { getDatabase, ref as dbRef, set, onValue, get, child } from 'firebase/database';
import { getUserFromDB } from './user';
import { DocumentData, getFirestore, collection, doc, setDoc, getDoc, getDocs } from 'firebase/firestore';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { db } from './firebase';
interface User {
  username: string;
}

export interface Image {
  id: string;
  author: string;
  imageUrl: string;
  imageName: string;
  description: string;
  category: string;
  likes: string[];
}

// const imagesCollection = collection(firestore, 'images');
// const usersCollection = collection(firestore, 'users');

export async function uploadImage(
  image: File,
  user: User,
  imageName: string,
  imageDescr: string,
  imageCategory: string
): Promise<void> {
  try {
const storage = getStorage();
const db = getFirestore();    
const storageRef = ref(storage, `images/${image.name}`);
    uploadBytes(storageRef, image).then((snapshot) => {
      
      console.log('snapshot', snapshot);
    });

    set(dbRef(db, 'images/' + image.name), {
      imageName,
      description: imageDescr,
      author: user.username,
      category: imageCategory,
      likes: []
    });
    const userSnapshot = onValue(dbRef(db, 'users'), (snapshot) => {
      const data = snapshot.val().filter((user: any) => user.username === user.username);
      console.log(data)})
    // const uploadTask = '';
    // uploadTask.on(
    //   'state_changed',
    //   () => { },
    //   (error) => {
    //     throw new Error(error.message);
    //   },
    //   async () => {
    //     const url = await storage.ref("images").child(image.name).getDownloadURL();
    //     const imageDoc = await db.collection('images').add({
    //       imageName,
    //       description: imageDescr,
    //       author: user.username,
    //       category: imageCategory,
    //       url,
    //       likes: []
    //     });
    //     const userSnapshot = await db.collection("users").where("username", "==", user.username).get();
    //     const userRef = db.collection("users").doc(userSnapshot.docs[0].id);
    //     await userRef.update({
    //       images: firebase.firestore.FieldValue.arrayUnion(imageDoc.id)
    //     });
    //   }
    // );
  } catch (error) {
    throw new Error(`Failed to upload image: ${error.message}`);
  }
}

export async function updateImage(
  id: string,
  imageName: string,
  imageDescr: string,
  imageCategory: string
): Promise<void> {
  try {
    const imageRef = db.collection("images").doc(id);
    await imageRef.update({
      imageName,
      description: imageDescr,
      category: imageCategory
    });
  } catch (error) {
    throw new Error(`Failed to update image: ${error.message}`);
  }
}

export async function getOne(id: string): Promise<DocumentData> {
  try {
    const doc = await db.collection("images").doc(id).get();
    return doc.data();
  } catch (error) {
    throw new Error(`Failed to get image: ${error.message}`);
  }
}

export async function getAllUserImages(email: string): Promise<Image[] | null> {
  if (!email) {
    return null;
  }
  try {
    const user = await getUserFromDB(email);
    const querySnapshot = await db.collection('images').where("author", "==", user.username).get();
    const images: Image[] = [];
    querySnapshot.forEach((doc) => {
      images.push({
        id: doc.id,
        author: doc.data().author,
        imageUrl: doc.data().url,
        imageName: doc.data().imageName,
        description: doc.data().description,
        category: doc.data().category,
        likes: doc.data().likes
      });
    });
    return images;
  } catch (error) {
    throw new Error(`Failed to get user images: ${error.message}`);
  }
}

export async function getAllImages(): Promise<Image[]> {
  try {
    const querySnapshot = await db.collection('images').get();
    const images: Image[] = [];
    querySnapshot.forEach((doc) => {
      images.push({
        id: doc.id,
        author: doc.data().author,
        imageUrl: doc.data().url,
        imageName: doc.data().imageName,
        description: doc.data().description,
        category: doc.data().category,
        likes: doc.data().likes
      });
    });
    return images;
  } catch (error) {
    throw new Error(`Failed to get all images: ${error.message}`);
  }
}

export async function getTop3Images(): Promise<Image[]> {
  const firestore = getFirestore();
  const querySnapshot = await getDocs(collection(firestore, 'images'));
  const images: Image[] = [];
  querySnapshot.forEach((doc) => {
    images.push({
      id: doc.id,
      author: doc.data().author,
      imageUrl: doc.data().url,
      imageName: doc.data().imageName,
      description: doc.data().description,
      category: doc.data().category,
      likes: doc.data().likes
    });
  });
  return images.sort((a, b) => b.likes.length - a.likes.length).slice(0, 3);
  //   return images.slice(0, 3);
  // const imagesRef = doc(firestore, 'images', 'images');
  // const imagesSnapshot = await getDoc(imagesRef);
  // const images = imagesSnapshot.data();
  // console.log(images);

  // get(child(dbRef(db, 'images'), 'images')).then((snapshot) => {
  //   if (snapshot.exists()) {
  //     console.log(snapshot.val());
  //   } else {
  //     console.log('No data available');
  //   }
  // })
  // const images: Image[] = [];
  // const imagesRef = dbRef(db, 'images');
  // onValue(imagesRef, (snapshot) => {
  //   const data = snapshot.val();
  //   console.log(data);
  // });
  // try {
  //   const querySnapshot = await db.collection('images').get();
  //   const images: Image[] = [];
  //   querySnapshot.forEach((doc) => {
  //     images.push({
  //       id: doc.id,
  //       author: doc.data().author,
  //       imageUrl: doc.data().url,
  //       imageName: doc.data().imageName,
  //       description: doc.data().description,
  //       category: doc.data().category,
  //       likes: doc.data().likes
  //     });
  //   });
  //   images.sort((a, b) => b.likes.length - a.likes.length);
  //   return images.slice(0, 3);
  // } catch (error) {
  //   throw new Error(`Failed to get top 3 images: ${error.message}`);
  // }
}

export async function addLikeToImage(imageId: string, userId: string): Promise<void> {
  try {
    
    const imageRef = db.collection("images").doc(imageId);
    // const imageRef =
    await imageRef.update({
      likes: firebase.firestore.FieldValue.arrayUnion(userId)
    });
  } catch (error) {
    throw new Error(`Failed to add like to image: ${error.message}`);
  }
}

export async function deleteImage(id: string): Promise<void> {
  try {
    await db.collection("images").doc(id).delete();
  } catch (error) {
    throw new Error(`Failed to delete image: ${error.message}`);
  }
}