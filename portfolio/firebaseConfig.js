// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCA6iVAJvseYe_zMXuk5YJYekr7Pdfkpf8",
  authDomain: "henriquepontees-e8b0a.firebaseapp.com",
  projectId: "henriquepontees-e8b0a",
  storageBucket: "henriquepontees-e8b0a.firebasestorage.app",
  messagingSenderId: "369882024093",
  appId: "1:369882024093:web:cedcf1be52e8241ff7ec74"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };