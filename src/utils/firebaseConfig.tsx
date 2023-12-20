// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDNLqfceD3JNm9VQD8DwCISSHkePqR8iac",
  authDomain: "talkiitoutnew.firebaseapp.com",
  projectId: "talkiitoutnew",
  storageBucket: "talkiitoutnew.appspot.com",
  messagingSenderId: "893334387753",
  appId: "1:893334387753:web:aa0d9221d01e2ae318b038",
  measurementId: "G-WN555K7NJ6"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// firebase.initializeApp(firebaseConfig);

// export default firebase

// export const auth = getAuth(app);


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);