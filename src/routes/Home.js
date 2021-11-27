import React, {useEffect, useState} from "react";
import {
    collection,
    query,
    // getDocs,
    // getFirestore,
    orderBy,
    onSnapshot,
} from "firebase/firestore";

import Nweet from "../components/Nweet";
import {db} from "../fbase";
import NweetFactory from "../components/NweetFactory";

// from Router.js
const Home = ({userObj}) => {
    console.log("-----------> user", userObj.uid);
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

    return (
        <div>
            {/* 로그인-계정 */}
            <NweetFactory userObj={userObj} />

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
