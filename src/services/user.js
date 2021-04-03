import Cookies from 'js-cookie';
import { db } from './firebase';
import { auth } from './firebase'

export async function setUserData({ email, uid }, username) {
    Cookies.set('auth', { username: username, email: email, id: uid });
}

export function getUserData() {
    let cookie = Cookies.get('auth')

    return cookie ? JSON.parse(cookie) : {};
}

export async function getUserFromDB(email) {
    let userRef = await db.collection("users").where('email', '==', email).get().then(data => data.d_.docs['0'].id)
    let user = await db.collection("users").doc(userRef);
    let username = await user.get().then(doc => doc.data().username);
    return username;
}

export function getUserId() {
    const user = Cookies.get('auth')
    if (user !== '') {
        return JSON.parse(user).id;
    } else {
        return null
    }
}

export async function login(email, password) {
    await getUserFromDB(email).then((username) => {
        auth.signInWithEmailAndPassword(email, password)
            .then((user) => {
                console.log(user)
                setUserData(user.user, username);
                return user
            })
    })
        .catch(e => {
            throw new Error(e);
        })
}

export async function register(email, password, username) {

    auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
            db.collection("users").add({
                username: username,
                email: email,
                images: []
            })
                .catch((error) => {
                    throw new Error(error);
                });

            return login(email, password, username)
        })
        .catch((error) => {
            let errorMessage = error.message;

            throw new Error(errorMessage)
        });
}


export async function logout() {
    auth.signOut().then(() => {
        Cookies.remove('auth');
        

    }).catch((error) => {
        throw new Error(error);
    });



}

export function checkFieldsInForm(username, password, rePassword, email) {
    let userRegex = /^[A-Za-z\d]*$/g;
    let emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g;


    if (password !== rePassword) {
        throw new Error('Passwords does not match');
    }

    if (password.length < 5) {
        throw Error('Password should be at least 5 characters long');
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

