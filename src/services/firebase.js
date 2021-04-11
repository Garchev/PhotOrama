import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCUqtPCx0Z975rEMct90RLo4fON5oGGV2I",
    authDomain: "photoramaproj.firebaseapp.com",
    projectId: "photoramaproj",
    storageBucket: "photoramaproj.appspot.com",
    messagingSenderId: "648615175331",
    appId: "1:648615175331:web:2f6edbf1e98df7e5ff8b16"
   
};

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
export const storage = firebase.storage();
export const auth = firebase.auth();


