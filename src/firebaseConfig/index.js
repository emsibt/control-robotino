// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

function StartFirebase() {
  const firebaseConfig = {
    apiKey: "AIzaSyAcpBJc8r1RqUSeDY2NkLqwqmRDxQiWQxw",
    authDomain: "robotino-7cf98.firebaseapp.com",
    databaseURL: "https://robotino-7cf98-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "robotino-7cf98",
    storageBucket: "robotino-7cf98.appspot.com",
    messagingSenderId: "28471819512",
    appId: "1:28471819512:web:ecac855cc6bc5682b54f0d",
    measurementId: "G-4P09S2D0QV",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  return getDatabase(app);
}

export default StartFirebase;
