import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";

function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </>
    );
}

export default App;