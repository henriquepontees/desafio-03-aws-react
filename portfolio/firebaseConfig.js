// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQXDJJ7ieKPGs2m31y-cYXpmR24q_qFAs",
  authDomain: "teste-1b792.firebaseapp.com",
  projectId: "teste-1b792",
  storageBucket: "teste-1b792.firebasestorage.app",
  messagingSenderId: "912874085732",
  appId: "1:912874085732:web:8f788ffeb353b128b5ae71"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app }