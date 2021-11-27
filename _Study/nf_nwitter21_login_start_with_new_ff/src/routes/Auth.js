import React, {useState} from "react";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onChange = (e) => {
        console.log(e.target.name);
        const {
            target: {name, value},
        } = e;
        if (name === "email") setEmail(value);
        if (name === "password") setPassword(value);
    };
    const onSubmit = (e) => {
        e.preventDefault();
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
                <input type="submit" value="Log In" />
            </form>
            <div>
                <button>Continue with Google</button>
                <button>Continue with Github</button>
            </div>
        </div>
    );
};

export default Auth;
