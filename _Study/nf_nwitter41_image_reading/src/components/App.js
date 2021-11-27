import React, {useEffect, useState} from "react";
import AppRouter from "./Router";
import {auth} from "../fbase";
import {onAuthStateChanged} from "firebase/auth";

function App() {
    console.log("auth.r..", auth);
    console.log("auth.currentUser..", auth.currentUser);

    const [init, setInit] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); //이것 대신 AppROuter 속성을 조정할 수 있음...
    const [userObj, setUserObj] = useState(null);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsLoggedIn(true);
                setUserObj(user);
                console.log("userObj ...", userObj);
            } else {
                setIsLoggedIn(false);
            }
            setInit(true);
            console.log("useEffect changed ...", user);
        });
    }, []);

    return (
        <>
            {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} /> : "Initializing"}
            {/* {init ? <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj}/> : "Initializing" } */}
            <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
        </>
    );
}

export default App;
