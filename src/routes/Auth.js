import {GithubAuthProvider, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import React from "react";
import AuthForm from "../components/AuthForm";
import {auth} from "../fbase";

const Auth = () => {
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
            <AuthForm />
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
