import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDGnT5Vm_rd2fxrxnc5-YVmD551ft9bkYE",
    authDomain: "path-wise-792e5.firebaseapp.com",
    projectId: "path-wise-792e5",
    storageBucket: "path-wise-792e5.firebasestorage.app",
    messagingSenderId: "830896169062",
    appId: "1:830896169062:web:10a02ecf7b6c9bdd7f0da7",
    measurementId: "G-L6HT6XNJ8K"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
