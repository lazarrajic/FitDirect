import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Browse from "./pages/Browse";

// const firebaseConfig = {
//   apiKey: "AIzaSyAp-LWg3U149al6t8ocsXp_uvkkjCBzbI4",
//   authDomain: "fitdirect-5b143.firebaseapp.com",
//   projectId: "fitdirect-5b143",
//   storageBucket: "fitdirect-5b143.appspot.com",
//   messagingSenderId: "858600029225",
//   appId: "1:858600029225:web:63ed21f7abba0bba75f038",
//   measurementId: "G-RCT3NKN12Q",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// const analytics = getAnalytics(app);

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/browse" element={<Browse />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
