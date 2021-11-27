import React, {useState} from "react";
import {HashRouter as Router, Route, Routes} from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";

const AppRouter = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    return (
        <Router>
            <Routes>
                {isLoggedIn ? (
                    <Route exact path="/" element={<Home />}></Route>
                ) : (
                    <Route exact path="/" element={<Auth />}></Route>
                )}
            </Routes>
        </Router>
    );
};

export default AppRouter;

// isLoggedIn을 props로 사용해서 App에서 관리 => props로 받아온다
//
// const AppRouter = ({isLoggedIn}) => {
//     return (
//         <Router>
//             <Routes>
//                 {isLoggedIn ? (
//                     <Route exact path="/" element={<Home />}></Route>
//                 ) : (
//                     <Route exact path="/" element={<Auth />}></Route>
//                 )}
//             </Routes>
//         </Router>
//     );
// };
