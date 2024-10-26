import Cookies from "js-cookie";
import { ObjectLiteral } from "../../../newRepo/src/types/commonTypes";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { collection, doc, getDoc, setDoc, getDocs, query, where } from "firebase/firestore";
import { firestore } from "./firebase";

// auth.onAuthStateChanged(function (data: ObjectLiteral) {
//   if (data) {
//     getUserFromDB(data.email).then((user) => {
//       Cookies.set("auth", {
//         username: user.username,
//         email: user.email,
//         id: user.id,
//       });
//     });
//   }
// });
const usersDb = collection(firestore, "users");
const storage = collection(firestore, "images");

export function setUserData(user: ObjectLiteral, username: string) {
  Cookies.set("auth", { username: username, email: user.email, id: user.uid });
}

export function getUserData() {
  const cookie = Cookies.get("auth");

  return cookie ? JSON.parse(cookie) : null;
}

export async function setUserInDB ({ email, uid }: ObjectLiteral, username: string) {
  const user = doc(usersDb, uid);
  await setDoc(user, { email, username });
}

export async function getUserFromDB (email: string) {
  const q = query(usersDb, where("email", "==", email));
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    return querySnapshot.docs[0].data();
  } else {
    throw new Error("No user found with the provided email.");
  }
  // const userRef = await getDoc(ref(firestore, 'users'));
  
  // const userRef = await db
  //   .collection("users")
  //   .where("email", "==", email)
  //   .get()
  //   .then((data: any) => data.d_.docs["0"].id);
  // const user = db.collection("users").doc(userRef);

  // return await user.get().then((doc: any) => doc.data());
}

export function getUserId() {
  const user = Cookies.get("auth");
  if (user !== "") {
    return JSON.parse(user as string).id;
  } else {
    return null;
  }
}

export async function login(email: string, password: string) {
  const auth = getAuth();
  
  return signInWithEmailAndPassword(auth, email, password);
}

export async function register(email: string, password: string) {
  const auth = getAuth();
  
  return createUserWithEmailAndPassword(auth, email, password);
}

export async function logout() {
  const auth = getAuth();
  
  Cookies.remove("auth");
  return auth.signOut().catch((error: string) => {
    throw new Error(error);
  });
}

export function checkFieldsInForm(
  username: string,
  password: string,
  rePassword: string,
  email: string
) {
  const userRegex = /^[a-zA-Z0-9]+$/i;
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g;

  if (password !== rePassword) {
    throw new Error("Passwords does not match");
  }

  if (password.length < 5) {
    throw new Error("Password should be at least 5 characters long");
  }

  if (username.length < 4) {
    throw new Error("Username should be at least 4 characters long");
  }

  if (!userRegex.test(username)) {
    throw new Error("Username must contain only english constters and numbers");
  }

  if (!emailRegex.test(email)) {
    throw new Error("Please enter a valid email address");
  }
}
