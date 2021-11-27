import {
    createUserWithEmailAndPassword,
    GithubAuthProvider,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
} from "firebase/auth";
import React, {useState} from "react";
import {auth} from "../fbase";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");

    const onChange = (e) => {
        console.log("e.target.value:", e.target.value);
        const {
            target: {name, value},
        } = e;
        if (name === "email") setEmail(value);
        if (name === "password") setPassword(value);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log("email, password ...", email, password);
        try {
            let data;
            if (newAccount) {
                data = await createUserWithEmailAndPassword(auth, email, password);
            } else {
                data = await signInWithEmailAndPassword(auth, email, password);
            }
            console.log("data:", data);
        } catch (error) {
            setError(error.message);
            console.log("login error", error.message);
        }
    };

    const toggleAccount = () => setNewAccount((prev) => !prev);

    const onSocialClick = async (event) => {
        const {
            target: {name},
        } = event;
        let provider;
        try {
            if (name === "google") {
                provider = new GoogleAuthProvider();
            }
            if (name === "github") {
                provider = new GithubAuthProvider();
            }
            console.log("000000======>", provider);
            //
            const result = await signInWithPopup(auth, provider);
            //
            console.log("1111111======>", provider);
            console.log("result:", result);
        } catch (error) {
            console.log("ERROR:", error);
        }
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    name="email"
                    type="text"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={onChange}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Pathword"
                    required
                    value={password}
                    onChange={onChange}
                />
                <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
                {error}
            </form>
            <span onClick={toggleAccount}>{newAccount ? "Sign In..." : "Create Account"}</span>
            <div>
                <button onClick={onSocialClick} name="google">
                    Continue with Google
                </button>
                <button onClick={onSocialClick} name="github">
                    Continue with Github
                </button>
            </div>
        </div>
    );
};

export default Auth;
