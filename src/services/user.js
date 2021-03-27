import Cookies from 'js-cookie';
import { db } from '../services/firebase';
import { request } from "./requests.js";
const apiKey = 'AIzaSyCOZnIFg0vxTm_1PElxbHYbyF-k9nmKGTo';

const endpoints = {
    login: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=',
    register: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='
}

export async function setUserData({ email, localId }, username) {

    Cookies.set('auth', { username: username, email: email, id: localId });
}

export function getUserData() {
    let cookie = Cookies.get('auth')

    return cookie ? JSON.parse(cookie) : {};




}

export async function getUserFromDB(email) {
    let userRef = await db.collection("users").where('email', '==', email).get().then(data => data.d_.docs['0'].id)
    let user = await db.collection("users").doc(userRef);
    let username = await user.get().then(doc => doc.data());
    return username;
}

export function getUserId() {
    const user = Cookies.get('auth')
    if (user !== '') {
        return JSON.parse(user).localId;
    } else {
        return null
    }
}

export async function login(email, password) {
    let response = await request(endpoints.login + apiKey, "POST", {
        email: email, password: password
    });

    let username = await getUserFromDB(email);
    setUserData(response, username.username);
    return response;
}

export async function register(email, password, repassword, username) {

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

export function checkFieldsInForm(username, password, rePassword, email) {
    let userRegex = /^[A-Za-z\d]*$/g;
    let emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g;
   

    if (password !== rePassword) {
        throw new Error('Passwords does not match');
    }

    if (password.length < 5) {
        throw Error ('Password should be at least 5 characters long');
    }

    if (username.length < 4) {
        throw new Error('Username should be at least 4 characters long');
    }

    if (userRegex.test(username)) {
        throw new Error('Username must contain only english letters and numbers');
    }

    if (emailRegex.test(email)) {
        throw new Error('Please enter a valid email address');
    }
}

