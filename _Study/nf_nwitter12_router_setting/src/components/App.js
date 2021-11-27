import React from "react";
import AppRouter from "./Router";

function App() {
    return <AppRouter />;
}

export default App;

// isLoggedIn을 props로 사용해서 App에서 관리

// function App() {
//     const [isLoggedIn, setIsLoggedIn] = useState(false);

//     return (
//         <>
//             <AppRouter isLoggedIn={isLoggedIn} />
//             <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
//         </>
//     );
// }
