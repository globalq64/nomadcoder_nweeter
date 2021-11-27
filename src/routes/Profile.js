import React, {useEffect, useState} from "react";
import {collection, getDocs, query, where, orderBy} from "firebase/firestore";
import {useNavigate} from "react-router-dom";
//import { useNavigate } from "react-router"; //useHistory, push 사용불가

import {auth, db} from "../fbase";
import {updateProfile} from "firebase/auth";

const Profile = ({refreshUser, userObj}) => {
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

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

    const onChange = (e) => {
        const {
            target: {value},
        } = e;
        setNewDisplayName(value);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log("newDisplayName===>", newDisplayName);

        if (userObj) {
            if (userObj.displayName === null) {
                // await updateProfile(userObj, {displayName: "Anonymous"});
                await updateProfile(auth.currentUser, {displayName: "Anonymous"});
            }
            if (userObj.displayName !== newDisplayName) {
                // await updateProfile(userObj, {displayName: newDisplayName}); =>에러(아래수정)
                await updateProfile(auth.currentUser, {displayName: newDisplayName});
            }
            refreshUser();
        }
    };

    return (
        <>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="Display name"
                    onChange={onChange}
                    value={newDisplayName}
                />
                <input type="submit" value="Update Profile" />
            </form>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    );
};

export default Profile;
