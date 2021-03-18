import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyCOZnIFg0vxTm_1PElxbHYbyF-k9nmKGTo",
    authDomain: "photobase-ac586.firebaseapp.com",
    databaseURL: "https://photobase-ac586-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "photobase-ac586",
    storageBucket: "photobase-ac586.appspot.com",
    messagingSenderId: "654772891078",
    appId: "1:654772891078:web:8f2a807f354e52cd8e16c7",
    measurementId: "G-QFLYQPWCD6"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();


export async function uploadImage(image, progress, setProgress, cookie, imageName, imageDescr) {
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
                        title: image.name,
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

        db.collection("images").where("author", "==", "Stancho")
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(doc.data().url)
            console.log(doc.id, " => ", doc.data());
        });
    })
}

function writeNewImage(username, url, title, description) {

    let postData = {
        author: username,
        url: url,
        title: title,
        description: description,
        likes: 0,
    };

    let newImageKey = firebase.database().ref().child('images').push().key;
    let updates = {};
    updates['/images/' + newImageKey] = postData;
    updates['/users/' + username + '/' + newImageKey] = postData;

    return firebase.database().ref().update(updates);
}

export default db