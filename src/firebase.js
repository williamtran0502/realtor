// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3nEcbRJkQmRqGFJ28dugbs9Y8y7qJ_YQ",
  authDomain: "realtor-d73fd.firebaseapp.com",
  projectId: "realtor-d73fd",
  storageBucket: "realtor-d73fd.appspot.com",
  messagingSenderId: "165430024361",
  appId: "1:165430024361:web:94397797c89fbd487371b8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const db= getFirestore()