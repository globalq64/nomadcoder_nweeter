import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore, collection, getDocs} from "firebase/firestore/lite";

// const firebaseConfig = {
// apiKey: process.env.REACT_APP_API_KEY,
// authDomain: process.env.REACT_APP_AUTH_DOMAIN,
// projectId: process.env.REACT_APP_PROJECT_ID,
// storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
// messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
// appId: process.env.REACT_APP_APP_ID,
// };

const firebaseConfig = {
    apiKey: "AIzaSyDI8e_mA_jo5FIKNShiILxEaUDc1PSzEOA",
    authDomain: "nomad-nwitter-bee12.firebaseapp.com",
    projectId: "nomad-nwitter-bee12",
    storageBucket: "nomad-nwitter-bee12.appspot.com",
    messagingSenderId: "1067997835647",
    appId: "1:1067997835647:web:c3ea9e81235a79e19eea4a",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const auth = getAuth(app);
