import React, {useEffect, useState} from "react";
import AppRouter from "./Router";
import {auth} from "../fbase";
import {onAuthStateChanged} from "firebase/auth";

function App() {
    console.log("auth.r..", auth);
    console.log("auth.currentUser..", auth.currentUser);

    const [init, setInit] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); //이것 대신 AppROuter 속성을 조정할 수 있음...
    const [userObj, setUserObj] = useState("");

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsLoggedIn(true);
                //setUserObj(user); //너무 많이 불러오므로, 이를 제한할 필요가 있다.
                setUserObj({
                    displayName: user.displayName,
                    uid: user.uid,
                    //updateProfile: (args) => user.updateProfile(args),
                });
                console.log("userObj ...", userObj);
            } else {
                setIsLoggedIn(false);
                //setUserObj(null);
            }
            setInit(true);
            console.log("useEffect changed ...", user);
        });
    }, []);

    const refreshUser = () => {
        const user = auth.currentUser;
        //setUserObj(auth.currentUser); //여기에서도 불러오는 대상을 아래와 같이 제한한다.
        setUserObj({
            displayName: user.displayName,
            uid: user.uid,
            //updateProfile: (args) => user.updateProfile(args),
        });
    };

    return (
        <>
            {init ? (
                <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} refreshUser={refreshUser} />
            ) : (
                "Initializing"
            )}
            {/* {init ? <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj}/> : "Initializing" } */}

            <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
        </>
    );
}

export default App;
