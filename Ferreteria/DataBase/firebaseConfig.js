import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAstvKPbVplZFby6uG_r3yMsU0rzHVScrw",
    authDomain: "ferreteria-12fff.firebaseapp.com",
    projectId: "ferreteria-12fff",
    storageBucket: "ferreteria-12fff.firebasestorage.app",
    messagingSenderId: "957612831536",
    appId: "1:957612831536:web:a036ed4f664676dff10ef5"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
    }

    const appFirebase = initializeApp(firebaseConfig);

    export {appFirebase, firebase}