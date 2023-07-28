// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADo4WgghGSXKPpiyg26dQGlUzn4BCXGd8",
  authDomain: "nextbudget-f6967.firebaseapp.com",
  projectId: "nextbudget-f6967",
  storageBucket: "nextbudget-f6967.appspot.com",
  messagingSenderId: "895876708657",
  appId: "1:895876708657:web:5fcad92551ef201034d810",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
