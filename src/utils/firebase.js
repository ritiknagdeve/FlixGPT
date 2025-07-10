// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDg4izlsCzOcRH_qeG-8l3UIPOgnmNvcYE",
  authDomain: "flixgpt-pro.firebaseapp.com",
  projectId: "flixgpt-pro",
  storageBucket: "flixgpt-pro.firebasestorage.app",
  messagingSenderId: "892986800464",
  appId: "1:892986800464:web:107034a6b357b9661f9455",
  measurementId: "G-0ET4HRJS4X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);