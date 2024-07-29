// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDnqOdllhZ547uy_NVOl7TrWhhFN9FlOCY",
    authDomain: "image-cdn-6e16b.firebaseapp.com",
    projectId: "image-cdn-6e16b",
    storageBucket: "image-cdn-6e16b.appspot.com",
    messagingSenderId: "924166360564",
    appId: "1:924166360564:web:dc8c61ac34f91e6ed57da1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
