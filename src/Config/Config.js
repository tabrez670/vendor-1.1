import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

// const firebaseConfig = {
//     apiKey: "AIzaSyDq_WRJbnZtWnSxqbV_kl-ZZS8DVnhy6wg",
//     authDomain: "ecommerce-app-with-react-hooks.firebaseapp.com",
//     projectId: "ecommerce-app-with-react-hooks",
//     storageBucket: "ecommerce-app-with-react-hooks.appspot.com",
//     messagingSenderId: "719037100374",
//     appId: "1:719037100374:web:6c6091a610ce02b3a766f7",
//     measurementId: "G-ZN4GN3FPP7"
//   };

const firebaseConfig = {
  apiKey: "AIzaSyDphP_lZQ5aF9GDrZQp_NCFFdwkAGz5dyA",
  authDomain: "cropsale-69e4b.firebaseapp.com",
  projectId: "cropsale-69e4b",
  storageBucket: "cropsale-69e4b.appspot.com",
  messagingSenderId: "740691810725",
  appId: "1:740691810725:web:91b9c460d8acedb550b04c",
  measurementId: "G-NFSNG70402",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const fs = firebase.firestore();
const storage = firebase.storage();

export { auth, fs, storage };
