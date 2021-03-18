import Cookies from 'js-cookie';
import db from '../services/firebase';
import { request } from "./requests.js";
const apiKey = 'AIzaSyCOZnIFg0vxTm_1PElxbHYbyF-k9nmKGTo';

const endpoints = {
    login: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=',
    register: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='
}

export async function setUserData({email, localId}, username) {

    Cookies.set('auth', { username:username, email: email, id:localId });
}

export  function getUserData() {
    const user = Cookies.get('auth')

    return user ? JSON.parse(user) : null;
}

export function getUserId () {
    const user = Cookies.get('auth')
    if(user !== '') {
        return JSON.parse(user).localId;
    } else {
        return null
    }
}

export async function login (email, password) {
    let response = await request(endpoints.login + apiKey, "POST", {
        email:email, password:password
    });
    
    let userRef = await db.collection("users").where('email', '==', email).get().then(data => data.d_.docs['0'].id)
    let user = await db.collection("users").doc(userRef); 
    let username = await user.get().then(doc => doc.data());
    setUserData(response, username.username);
    return response;
}

export async function register (email, password, repassword, username) {
    
    let response = await request(endpoints.register + apiKey, "POST", {
        email,
        password,
        returnSecureToken: true
    });
    db.collection("users").add({
        username: username,
        email: email,
        images: []
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });

    await setUserData(response, username);
    return response;
}
  

export async function logout() {
    
    
}

