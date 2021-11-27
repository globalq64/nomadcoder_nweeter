import React, {useRef, useState} from "react";
import {collection, addDoc} from "firebase/firestore";
import {ref, uploadString, getDownloadURL} from "firebase/storage";
import {v4} from "uuid";
import {db, storageService} from "../fbase";

const NweetFactory = ({userObj}) => {
    const [nweet, setNweet] = useState("");

    const [attachment, setAttachment] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();

        let attachmentUrl = "";
        if (attachment !== "") {
            const attachmentRef = ref(storageService, `${userObj.uid}/${v4()}`); //uuid package문법
            const response = await uploadString(attachmentRef, attachment, "data_url");
            console.log("response", response);
            attachmentUrl = await getDownloadURL(response.ref);
        }

        const nweetPosting = {
            text: nweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl,
        };

        const docRef = await addDoc(collection(db, "nweets"), nweetPosting);
        setNweet("");
        setAttachment("");
        console.log("Document - Succeed: ", docRef);
        onClearAttachmentClick(); // UseRef사용하여 Nweet후에 남는 파일이름 삭제
    };

    const onChange = ({target: {value}}) => {
        setNweet(value);
    };

    //   const onChange = (e) => {
    //     const {
    //       target: { value },
    //     } = e;
    //     setNweet(value);
    //   };

    const onFileChange = (e) => {
        console.log("images ...", e.target.files);
        const {
            target: {files},
        } = e;
        const theFile = files[0];
        const reader = new FileReader();
        reader.readAsDataURL(theFile);
        reader.onloadend = (e) => {
            console.log("finishedEvent:", e);
            const {
                currentTarget: {result},
            } = e;
            setAttachment(result);
        };
    };

    /* UseRef사용하여 clear후에 남는 파일이름 삭제  */
    const fileInput = useRef();
    const onClearAttachmentClick = () => {
        fileInput.current.value = "";
        setAttachment(null);
    };

    return (
        <form onSubmit={onSubmit}>
            <div>Home</div>
            <input
                onChange={onChange}
                value={nweet}
                type="text"
                placeholder="What is on your mind?"
                maxLength={120}
            />
            <input type="file" accept="image/*" onChange={onFileChange} ref={fileInput} />
            <input type="submit" value="Nweet" />

            {attachment && (
                <div>
                    <img src={attachment} width="50px" height="50px" alt="" />
                    <button onClick={onClearAttachmentClick}>Clear</button>
                </div>
            )}
        </form>
    );
};

export default NweetFactory;
