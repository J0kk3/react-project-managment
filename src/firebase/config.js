import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCOr5VJtA98YX9wdL58T7ZE7VAXVIlNL_k",
    authDomain: "project-managment-2dc16.firebaseapp.com",
    projectId: "project-managment-2dc16",
    storageBucket: "project-managment-2dc16.appspot.com",
    messagingSenderId: "45215087731",
    appId: "1:45215087731:web:611d23168f3f4520f07e06"
};

//Initialize firebase
firebase.initializeApp( firebaseConfig );
//Initialize services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();

//Timestamp
const Timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, projectStorage, Timestamp };