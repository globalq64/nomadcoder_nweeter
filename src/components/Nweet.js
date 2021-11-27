import {deleteDoc, doc, updateDoc} from "@firebase/firestore";
import React, {useState} from "react";
import {db, storageService} from "../fbase";
import {deleteObject, ref} from "@firebase/storage";

// called each nweet message from Home.js... map
const Nweet = ({nweetObj, isOwner}) => {
    console.log("nweetObj.creatorId called from Home.js ...", nweetObj.creatorId);
    console.log("nweetObj.text called from Home.js ...", nweetObj.text);
    console.log("isOwner ???", isOwner);

    const [isEditing, setIsEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);

    const onDeleteClick = async () => {
        const ok = window.confirm("Are you sure you want to delete this nweet?");
        console.log("window.confirm OK???", ok);
        if (ok) {
            // Firebase데이터베이스에서 doc(Delete literal)삭제
            //const nweetTextRef = doc(db, "nweets", `${nweetObj.id}`);
            const nweetTextRef = doc(db, `nweets/${nweetObj.id}`);
            await deleteDoc(nweetTextRef);

            // Firebase Storage에서 ref(url)삭제. 있는 경우에 삭제 필요
            if (nweetObj.attachmentUrl) {
                const urlRef = ref(storageService, nweetObj.attachmentUrl);
                await deleteObject(urlRef);
            }
        }
    };

    const toggleEditing = () => setIsEditing((prev) => !prev);

    const onChangeClick = (e) => {
        const {
            target: {value},
        } = e;
        setNewNweet(value);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log("onSubmit -nweetobj - newNweet", nweetObj, newNweet);

        const nweetTextRef = doc(db, "nweets", `${nweetObj.id}`);
        await updateDoc(nweetTextRef, {text: newNweet});
        setIsEditing(false);
    };

    return (
        <div>
            {isEditing ? (
                <>
                    <form onSubmit={onSubmit}>
                        <input
                            type="text"
                            placeholder="Edit your nweet"
                            value={newNweet}
                            required
                            onChange={onChangeClick}
                        />
                        <input type="submit" value="Update Nweet" />
                    </form>
                    <button onClick={toggleEditing}>Cancel</button>
                </>
            ) : (
                <>
                    <h4>{nweetObj.text}</h4>

                    {nweetObj.attachmentUrl && (
                        <img src={nweetObj.attachmentUrl} width="50px" height="50px" alt="" />
                    )}
                    {isOwner && (
                        <>
                            <button onClick={onDeleteClick}>Delete Nweet!!</button>
                            <button onClick={toggleEditing}>Edit Nweet...</button>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default Nweet;
