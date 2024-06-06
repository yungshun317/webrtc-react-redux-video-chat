import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import {useEffect} from "react";
import Dashboard from "./Dashboard/Dashboard";
import LoginPage from "./LoginPage/LoginPage";
import './App.css';
import {connectWithWebSocket} from "./utils/wssConnection/wssConnection";

function App() {
    useEffect(() => {
        connectWithWebSocket();
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/dashboard" element={<Dashboard />}/>
                <Route path="/" element={<LoginPage />}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
