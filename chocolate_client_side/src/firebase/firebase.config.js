// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5xHZl4ytW9hI0h3JnQQVBjG5rNnw236w",
  authDomain: "simple-login-regi.firebaseapp.com",
  projectId: "simple-login-regi",
  storageBucket: "simple-login-regi.appspot.com",
  messagingSenderId: "409574259047",
  appId: "1:409574259047:web:f9733cc095c6c346dc97c2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app