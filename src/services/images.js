import { db, storage } from './firebase';
import firebase from 'firebase';
import { getUserFromDB } from './user';

export async function uploadImage(image, user, imageName, imageDescr, imageCategory) {
    console.log(user)
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
        'state-changed',
        snapshot => { },
        error => {
            throw new Error(error);
        },
        () => {
            storage
                .ref("images")
                .child(image.name)
                .getDownloadURL()
                .then(url => {
                    db.collection('images').add({
                        imageName: imageName,
                        description: imageDescr,
                        author: user.username,
                        category: imageCategory,
                        url: url,
                        likes: []
                    }).then(res => {
                        db.collection("users").where("username", "==", user.username).get().then((e) => {
                            let ref = db.collection("users").doc(e.docs['0'].id);
                            ref.update({
                                images: firebase.firestore.FieldValue.arrayUnion(res.d_.id)
                            });
                        });
                    })
                })
        });

}

export async function updateImage(id, imageName, imageDescr, imageCategory) {
    let imageRef = db.collection("images").doc(id);

    return imageRef.update({
        imageName: imageName,
        description: imageDescr,
        category: imageCategory
    })
        .catch((error) => {
            throw new Error( error);
        });
}

export async function getOne(id) {
    return await db.collection("images").doc(id).get().then((res) => res)
}

export async function getAllUserImages(email) {
    if (!email) {
        return null;
    }
    let user = await getUserFromDB(email);

    let images = [];
    await db.collection('images').where("author", "==", user.username).get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                images.push(
                    {
                        id: doc.id,
                        author: doc.data().author,
                        imageUrl: doc.data().url,
                        imageName: doc.data().imageName,
                        description: doc.data().description,
                        category: doc.data().category,
                        likes: doc.data().likes
                    })
            });
        })
        .catch((error) => {
            throw new Error( error);
        });

    return images;
}

export async function getAllImages() {

    let images = [];
    await db.collection('images').get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                images.push(
                    {
                        id: doc.id,
                        author: doc.data().author,
                        imageUrl: doc.data().url,
                        imageName: doc.data().imageName,
                        description: doc.data().description,
                        category: doc.data().category,
                        likes: doc.data().likes
                    })
            });
        })
        .catch((error) => {
            throw new Error( error);
        });

    return images;
}

export async function getTop3Images() {
    let images = [];
    await db.collection('images').get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                images.push(
                    {
                        id: doc.id,
                        author: doc.data().author,
                        imageUrl: doc.data().url,
                        imageName: doc.data().imageName,
                        description: doc.data().description,
                        category: doc.data().category,
                        likes: doc.data().likes
                    })
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
    let top = images.sort((a, b) => {
        return (b.likes.length - a.likes.length)
    });
    top = top.slice(0, 3)
    return top;
}

export async function addLikeToImage(imageId, userId) {

    let imageRef = db.collection("images").doc(imageId);
    imageRef.update({
        likes: firebase.firestore.FieldValue.arrayUnion(userId)
    });
}