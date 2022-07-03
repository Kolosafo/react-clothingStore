import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDzrJ58hHhW7GbR9_gFG5WTUtLJ7Zd-kEA",
  authDomain: "crwn-clothing-db-d96ee.firebaseapp.com",
  projectId: "crwn-clothing-db-d96ee",
  storageBucket: "crwn-clothing-db-d96ee.appspot.com",
  messagingSenderId: "317857402505",
  appId: "1:317857402505:web:d2f00f29c3232ab1d94058",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provide = new GoogleAuthProvider();
provide.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provide);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);


  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("error created the user ", error.message);
    }
  }

  return userDocRef;
};
