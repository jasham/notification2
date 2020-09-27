import firebase from "firebase/app";
import "firebase/firestore";
import firebaseConfig from './firebase-config.js'


  export const myFirebase = firebase.initializeApp(firebaseConfig);
  const baseDb = myFirebase.firestore();
  export const db = baseDb;