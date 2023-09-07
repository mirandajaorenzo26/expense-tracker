// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFmhX3ZZd_BSfOvL3dyiLkkRlHOoxWoFY",
  authDomain: "expense-tracker-308ec.firebaseapp.com",
  projectId: "expense-tracker-308ec",
  storageBucket: "expense-tracker-308ec.appspot.com",
  messagingSenderId: "453752297235",
  appId: "1:453752297235:web:6a34b00d6ad05fde9eace6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
