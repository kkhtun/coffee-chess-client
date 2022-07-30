// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import * as firebase from "firebase/app";
import "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD3dyqIILe1wKSN04RbV-3RBJYDtQ8ayCE",
    authDomain: "chess-dev-b17d1.firebaseapp.com",
    projectId: "chess-dev-b17d1",
    storageBucket: "chess-dev-b17d1.appspot.com",
    messagingSenderId: "780216984688",
    appId: "1:780216984688:web:56df00137067bb2eed00b5",
    measurementId: "G-77DBQZF4N5",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export default app;
