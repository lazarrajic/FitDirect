// firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAp-LWg3U149al6t8ocsXp_uvkkjCBzbI4",
  authDomain: "fitdirect-5b143.firebaseapp.com",
  projectId: "fitdirect-5b143",
  storageBucket: "fitdirect-5b143.appspot.com",
  messagingSenderId: "858600029225",
  appId: "1:858600029225:web:63ed21f7abba0bba75f038",
  measurementId: "G-RCT3NKN12Q",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const analytics = getAnalytics(app);

export { db };
