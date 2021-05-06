import Firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyD8a3HIgsgYCbBqnMUGby8uu-W3iTZ4Lkg",
  authDomain: "insta-replica-a3919.firebaseapp.com",
  projectId: "insta-replica-a3919",
  storageBucket: "insta-replica-a3919.appspot.com",
  messagingSenderId: "1039268995948",
  appId: "1:1039268995948:web:92df443ade8d5c224f4949",
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

export { firebase, FieldValue };
