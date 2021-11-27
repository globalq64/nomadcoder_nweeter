import React from "react";
import {Link} from "react-router-dom";

const Navigation = ({userObj}) => {
    console.log("userObj@Navigation", userObj);
    return (
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/profile">Profile:{userObj.displayName}</Link>
            </li>
        </ul>
    );
};

export default Navigation;
