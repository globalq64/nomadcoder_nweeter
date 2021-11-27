import React, {useState} from "react";
import AppRouter from "components/Router";
import {auth} from "fbase";

function App() {
    console.log("auth.r..", auth);
    console.log("auth.currentUser..", auth.currentUser);

    const [isLoggedIn, setIsLoggedIn] = useState(auth.currentUser);

    return (
        <>
            <AppRouter isLoggedIn={isLoggedIn} />
            <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
        </>
    );
}

export default App;
