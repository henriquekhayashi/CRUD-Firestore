//import { initializeApp } from "firebase/app";

//import { getFirestore } from "firebase/firestore";
import firebase from "firebase";
import "firebase/firestore";

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBN_r0Dxi8byFy0PaZlrBPpTqPDBET5Jgs",
    authDomain: "meuprojetofirebase-a74a8.firebaseapp.com",
    databaseIRL: "https://meuprojetofirebase-a74a8.firebaseapp.io",
    projectId: "meuprojetofirebase-a74a8",
    storageBucket: "meuprojetofirebase-a74a8.appspot.com",
    messagingSenderId: "130792213361",
    appId: "1:130792213361:web:36ff8c2891b669ebb184d0"
  };

// Initialize Firebase
//const firebase = initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);

//export default firebase;

/*
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  console.log('FNF - firebase.initializeApp(firebaseConfig);')
}else {
  firebase.app(); // if already initialized, use that one
  console.log('FNF - firebase.app();')
}
*/

//const db = getFirestore();
const db = firebase.firestore();

export default {
  firebase,
  db
};

