// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-IRw36Ax7TS6W0FVEdlL3YSmuqgRsnng",
  authDomain: "zenith-3897e.firebaseapp.com",
  projectId: "zenith-3897e",
  storageBucket: "zenith-3897e.appspot.com",
  messagingSenderId: "52200990053",
  appId: "1:52200990053:web:e24431e7a7c7db5bf56d8c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
console.log(auth);
