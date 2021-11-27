import React, {useEffect, useState} from "react";
import {db} from "../fbase";
import {
    collection,
    addDoc,
    query,
    // getDocs,
    getFirestore,
    orderBy,
    onSnapshot,
} from "firebase/firestore";

const Home = ({userObj}) => {
    console.log("-----------> user", userObj.uid);
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);

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

    return (
        <div>
            {/* 로그인-계정 */}
            <form onSubmit={onSubmit}>
                Home
                <input
                    onChange={onChange}
                    value={nweet}
                    type="text"
                    placeholder="What is on your mind?"
                    maxLength={120}
                />
                <input type="submit" value="Nweet" />
            </form>

            {/* 리스팅 */}
            <div>
                {nweets.map((e) => (
                    <div key={e.id}>
                        <h4>
                            {e.text} : {e.id}
                        </h4>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
