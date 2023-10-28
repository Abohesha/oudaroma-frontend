// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from 'firebase/storage'


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtng8WHtrAUjALEHS5G-9nuT-4IUqjNEE",
  authDomain: "oudaroma-9445a.firebaseapp.com",
  projectId: "oudaroma-9445a",
  storageBucket: "oudaroma-9445a.appspot.com",
  messagingSenderId: "303018078452",
  appId: "1:303018078452:web:9e568193577edc4333eea1",
  measurementId: "G-YWD9KS6G9Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
const analytics = getAnalytics(app);