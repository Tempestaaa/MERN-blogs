// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-990cb.firebaseapp.com",
  projectId: "mern-blog-990cb",
  storageBucket: "mern-blog-990cb.appspot.com",
  messagingSenderId: "1017589086938",
  appId: "1:1017589086938:web:69864320920d6b5e58c3e3",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
