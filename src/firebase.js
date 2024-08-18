// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.MY_VITE_KEY,
  authDomain: "lovepercentcal.firebaseapp.com",
  projectId: "lovepercentcal",
  storageBucket: "lovepercentcal.appspot.com",
  messagingSenderId: "75239040178",
  appId: "1:75239040178:web:52326fdad6f2d04ca4d5ab",
  measurementId: "G-5JG8Y1MZ4L",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
