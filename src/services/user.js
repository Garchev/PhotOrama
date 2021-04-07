import Cookies from 'js-cookie';
import { db } from './firebase';
import { auth } from './firebase';


auth.onAuthStateChanged(function (data) {
    if (data) {
        getUserFromDB(data.email).then((user) => {
            Cookies.set('auth', { username: user.username, email: user.email, id: user.id });
        })
    } 
});

export function setUserData(user, username) {
    Cookies.set('auth', { username: username, email: user.email, id: user.uid });
}

export function getUserData() {
    let cookie = Cookies.get('auth')

    return cookie ? JSON.parse(cookie) : null;
}

export async function setUserInDB({ email, uid }, username) {
    db.collection("users").add({
        username: username,
        email: email,
        id: uid,
        images: []
    })
        .catch((error) => {
            throw new Error(error);
        });
}

export async function getUserFromDB(email) {
    let userRef = await db.collection("users").where('email', '==', email).get().then(data => data.d_.docs['0'].id)
    let user = db.collection("users").doc(userRef);

    return await user.get().then(doc => doc.data());
}

export function getUserId() {
    const user = Cookies.get('auth')
    if (user !== '') {
        return JSON.parse(user).id;
    } else {
        return null;
    }
}

export async function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
}

export async function register(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
}

export async function logout() {
    Cookies.remove('auth');
    return auth.signOut()
        .catch((error) => {
            throw new Error(error);
        });
}

export function checkFieldsInForm(username, password, rePassword, email) {
    let userRegex = /^[a-zA-Z0-9]+$/i;
    let emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g;

    if (password !== rePassword) {
        throw new Error('Passwords does not match');
    }

    if (password.length < 5) {
        throw new Error('Password should be at least 5 characters long');
    }

    if (username.length < 4) {
        console.log(username);
        throw new Error('Username should be at least 4 characters long');
    }

    if (!userRegex.test(username)) {

        throw new Error('Username must contain only english letters and numbers');
    }

    if (!emailRegex.test(email)) {
        throw new Error('Please enter a valid email address');
    }
}

