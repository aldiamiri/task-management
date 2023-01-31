// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAzTJ7dGi0pxz22kSWhHUwLBrGbQOngZVg",
  authDomain: "task-management-3ed99.firebaseapp.com",
  projectId: "task-management-3ed99",
  storageBucket: "task-management-3ed99.appspot.com",
  messagingSenderId: "588802657457",
  appId: "1:588802657457:web:56b6139aa19407a81aa690",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
