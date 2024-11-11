// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBqP5YazBMTpp1ehGdittYsjv-a2C4Od04",
  authDomain: "auth-email-password-4ece4.firebaseapp.com",
  projectId: "auth-email-password-4ece4",
  storageBucket: "auth-email-password-4ece4.firebasestorage.app",
  messagingSenderId: "255156509818",
  appId: "1:255156509818:web:5cad6b8651710f6629afc3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
export default auth;