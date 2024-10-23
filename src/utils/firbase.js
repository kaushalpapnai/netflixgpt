// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCziC_tL7LukJ6Wgy1reW5IXWuFGPtdIE4",
  authDomain: "netfilxgpt-1d806.firebaseapp.com",
  projectId: "netfilxgpt-1d806",
  storageBucket: "netfilxgpt-1d806.appspot.com",
  messagingSenderId: "825082403652",
  appId: "1:825082403652:web:975512eb4f83568e305511",
  measurementId: "G-14TTFRPMQP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth()