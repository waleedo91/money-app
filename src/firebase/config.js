import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyABoF44H-0WAWyh0MWze_cyChcaEPzx1bY",
  authDomain: "money-app-b531b.firebaseapp.com",
  projectId: "money-app-b531b",
  storageBucket: "money-app-b531b.appspot.com",
  messagingSenderId: "223241402338",
  appId: "1:223241402338:web:24a3c4fe030667941f6bbb",
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init service
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

// timestamp
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, timestamp };
