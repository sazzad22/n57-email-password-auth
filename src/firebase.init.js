// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCo83FLp44lBixOMqR5M486Q2KE6K7Vikk",
  authDomain: "email-password-auth-701d0.firebaseapp.com",
  projectId: "email-password-auth-701d0",
  storageBucket: "email-password-auth-701d0.appspot.com",
  messagingSenderId: "554731537880",
  appId: "1:554731537880:web:908c3e0fa2351e5ea25ead",
  measurementId: "G-4F5G21K73V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export  {app,analytics};