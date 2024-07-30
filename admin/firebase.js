// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const { VITE_APP_FIREBASE_API_KEY,
    VITE_APP_FIREBASE_AUTH_DOMANIN,
    VITE_APP_FIREBASE_PROJECT_ID,
    VITE_APP_FIREBASE_STORAGE_BUCKET,
    VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
    VITE_APP_FIREBASE_APP_ID
} = import.meta.env

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: VITE_APP_FIREBASE_API_KEY,
    authDomain: VITE_APP_FIREBASE_AUTH_DOMANIN,
    projectId: VITE_APP_FIREBASE_PROJECT_ID,
    storageBucket: VITE_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: VITE_APP_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
