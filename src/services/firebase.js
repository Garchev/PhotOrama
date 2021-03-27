import firebase from 'firebase';

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
export const db = firebase.firestore();
export const storage = firebase.storage();


