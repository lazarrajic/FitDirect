// firebase.js
// import { initializeApp } from "firebase/app";
// import { getDatabase } from "firebase/database";
// import { getAnalytics } from "firebase/analytics";

// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
import firebase from "firebase/app";
import "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyAp-LWg3U149al6t8ocsXp_uvkkjCBzbI4",
//   authDomain: "fitdirect-5b143.firebaseapp.com",
//   projectId: "fitdirect-5b143",
//   storageBucket: "fitdirect-5b143.appspot.com",
//   messagingSenderId: "858600029225",
//   appId: "1:858600029225:web:63ed21f7abba0bba75f038",
//   measurementId: "G-RCT3NKN12Q",
// };

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7nd9OVHIgNPJsXzdTik4xGmMshRrzwCA",
  authDomain: "salesmagnet-927f3.firebaseapp.com",
  projectId: "salesmagnet-927f3",
  storageBucket: "salesmagnet-927f3.appspot.com",
  messagingSenderId: "1097891059053",
  appId: "1:1097891059053:web:3673712cf36c09aac3b664",
  measurementId: "G-8PXLDDQZGL",
};

// const app = initializeApp(firebaseConfig);
// const db = getDatabase(app);
// const analytics = getAnalytics(app);

// export { db };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebase.firestore();

console.log("Firebase initialized successfully");
console.log("Firestore instance:", db);

export { db };

// i am using firebase V8 here
