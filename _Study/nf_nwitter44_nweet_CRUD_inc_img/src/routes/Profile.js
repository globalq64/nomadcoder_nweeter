import React, {useEffect} from "react";
import {collection, getDocs, query, where, orderBy} from "firebase/firestore";
import {useNavigate} from "react-router-dom";
//import { useNavigate } from "react-router"; //useHistory, push 사용불가

import {auth, db} from "../fbase";

const Profile = ({userObj}) => {
    const navigate = useNavigate();
    const onLogOutClick = () => {
        auth.signOut();
        navigate("/");
    };

    const getMyNweets = async () => {
        const q = query(
            collection(db, "nweets"),
            where("creatorId", "==", userObj.uid),
            orderBy("createdAt")
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " 11=> ", doc.data());
        });
        //체크목적=위와 동일함.
        querySnapshot.docs.map((doc) => {
            console.log(doc.id, " 22=> ", doc.data());
            return null;
        });
    };

    useEffect(() => {
        getMyNweets();
    }, []);

    return (
        <>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    );
};

export default Profile;
