// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBP76oeZ5eArsuE8yuGC9riM-z6AJbCUcA",
  authDomain: "fair-app-3d9ef.firebaseapp.com",
  projectId: "fair-app-3d9ef",
  storageBucket: "fair-app-3d9ef.firebasestorage.app",
  messagingSenderId: "386513439337",
  appId: "1:386513439337:web:efe32cbf354ef6868ff0f8",
  measurementId: "G-BL67ZK267J"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
