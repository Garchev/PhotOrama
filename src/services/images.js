import { db, storage } from './firebase';
import firebase from 'firebase';
import { getUserFromDB } from './user';

export async function uploadImage(image, setProgress, cookie, imageName, imageDescr) {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
        'state-changed',
        snapshot => {
            const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setProgress(progress)

        },
        error => {
            console.log(error)
        },
        () => {
            storage
                .ref("images")
                .child(image.name)
                .getDownloadURL()
                .then(url => {
                    db.collection('images').add({
                        title: imageName,
                        description: imageDescr,
                        author: cookie.username,
                        url: url,
                        likes: 0
                    }).then(res => {
                        db.collection("users").where("username", "==", cookie.username).get().then((e) => {
                            let ref = db.collection("users").doc(e.docs['0'].id);
                            ref.update({
                                images: firebase.firestore.FieldValue.arrayUnion(res.d_.id)
                            });
                        });
                    })
                })
        });

}

export async function getAllImages(email) {
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
                        title: doc.data().title,
                        description: doc.data().description,
                        likes: doc.data().likes
                    })
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
    
    return images;
}