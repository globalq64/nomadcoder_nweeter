import React, {useState} from "react";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "@firebase/auth";
import {auth} from "../fbase";

const AuthForm = () => {
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
        </div>
    );
};

export default AuthForm;
