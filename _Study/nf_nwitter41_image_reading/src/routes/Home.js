import React, {useEffect, useRef, useState} from "react";
import {db} from "../fbase";
import {
    collection,
    addDoc,
    query,
    // getDocs,
    // getFirestore,
    orderBy,
    onSnapshot,
} from "firebase/firestore";
import Nweet from "../components/Nweet";

// from Router.js
const Home = ({userObj}) => {
    console.log("-----------> user", userObj.uid);
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);

    const [attachment, setAttachment] = useState("");

    // const getNweets = async () => {
    //   console.log("====>Start");
    //   const q = query(collection(db, "nweets"));
    //   const querySnapshot = await getDocs(q);
    //   querySnapshot.forEach((doc) => {
    //     const nweetObj = {
    //       ...doc.data(),
    //       id: doc.id,
    //     };
    //     setNweets((prev) => [nweetObj, ...prev]);
    //   });
    //   console.log(nweets);
    //   console.log("====>END");
    // };

    useEffect(() => {
        // 실시간으로 데이터를 데이터베이스에서 가져오기
        const q = query(
            //collection(getFirestore(), "nweets"), //db=getFirestore()가 fbase.js에서 export 되어있다
            collection(db, "nweets"),
            // where('text', '==', 'hehe') // where뿐만아니라 각종 조건 이 영역에 때려부우면 됨
            orderBy("createdAt")
        );
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const newArray = querySnapshot.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data(),
                };
            });

            setNweets(newArray);
            console.log("Current tweets in CA: ", newArray);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    //

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const docRef = await addDoc(collection(db, "nweets"), {
                text: nweet,
                createdAt: Date.now(),
                creatorId: userObj.uid,
            });
            setNweet("");
            console.log("Document - Succeed: ", docRef);
        } catch (error) {
            console.error("Error adding document: ", error);
        }
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
        <div>
            {/* 로그인-계정 */}
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

            {/* 리스팅 */}
            <div>
                {nweets.map((e) => (
                    <Nweet key={e.id} nweetObj={e} isOwner={e.creatorId === userObj.uid} />
                ))}
            </div>
        </div>
    );
};

export default Home;
