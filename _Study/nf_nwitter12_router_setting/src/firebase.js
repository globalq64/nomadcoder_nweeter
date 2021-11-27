//import { initializeApp } from "firebase/app";
// import * as auth from "firebase/auth";
// import * as store from "firebase/firestore";
// import * as storage from "firebase/storage";

import * as firebase from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDI8e_mA_jo5FIKNShiILxEaUDc1PSzEOA",
    authDomain: "nomad-nwitter-bee12.firebaseapp.com",
    projectId: "nomad-nwitter-bee12",
    storageBucket: "nomad-nwitter-bee12.appspot.com",
    messagingSenderId: "1067997835647",
    appId: "1:1067997835647:web:c3ea9e81235a79e19eea4a",
};

// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);

// const app = initializeApp(firebaseConfig);
// export const firebaseAppAuth = auth;
// export const firebaseAuth = auth.getAuth();
// export const firebaseFireStore = store;
// export const fireStore = store.getFirestore();
// export const firebaseAppStorage = storage;
// export const firebaseStorage = storage.getStorage();
