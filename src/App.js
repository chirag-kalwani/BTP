import Navbar from "./components/Navbar";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import AlertState from "./context/AlertState";
import Home from "./components/Home";
import EnterProducts from "./components/EnterProducts";
import Graphs from "./components/Graphs";
import Inventory from "./components/Inventory";
import Login from "./components/Login";
import Alert from "./components/Alert"
import Register from "./components/Register";
import "./CSS/Login.css"
import "./CSS/Navbar.css"
import "./CSS/EnterProduct.css"
import "./CSS/Home.css"
import "./CSS/Inventory.css"
import "./CSS/Graph.css"
import "./CSS/Accordiaon.css"
function App() {
    return (
        <>
            <AlertState>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Navbar/>}>
                            <Route path="*" element={<Alert/>}/>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/EnterProducts" element={<EnterProducts/>}/>
                            <Route path="/Graphs" element={<Graphs/>}/>
                            <Route path="/Inventory" element={<Inventory/>}/>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/register" element={<Register/>}/>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </AlertState>
        </>
    );
}

export default App;
