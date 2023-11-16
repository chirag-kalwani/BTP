import React, { useContext, useEffect, useState, useRef } from "react";
import ProfileMenu from "./ProfileMenu";
import UserContext from "../context/UserContext";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Alert from "./Alert";
import SuggestionModal from "./SuggestionModal";

export default function Navbar() {
    const [openSetting, setOpenSetting] = useState(false);
    const [openInventory, setOpenInventory] = useState(false);
    const [openGraphs, setOpenGraphs] = useState(false);
    const context = useContext(UserContext);
    const { isLogin } = context;
    const location = useLocation();
    const navigate = useNavigate();
    const suggestionModalRef = useRef();
    const settingRef = useRef();
    const inventoryRef = useRef();
    const graphsRef = useRef();

    const settings = (
        <li className="nav-item mx-2 d-flex" ref={settingRef}>
            <Link
                className={"nav-link " + (location.pathname === "/Settings" ? "active" : "")}
                to="/Settings">
                Settings
            </Link>
            <button type="button" onClick={handleOpenSettings}
                className="btn-close ml-1 mt-2 btn-close-white"
                aria-label="Close"></button>
        </li>
    );

    const Inventory = (
        <li className="nav-item mx-2 d-flex" ref={inventoryRef}>
            <Link
                className={"nav-link " + (location.pathname === "/Inventory" ? "active" : "")}
                to="/Inventory">
                Inventory
            </Link>
            <button type="button" onClick={handleOpenInventory}
                className="btn-close ml-1 mt-2 btn-close-white"
                aria-label="Close"></button>
        </li>
    );

    const Graphs = (
        <li className="nav-item mx-2 d-flex" ref={graphsRef}>
            <Link
                className={"nav-link " + (location.pathname === "/Graphs" ? "active" : "")}
                to="/Graphs">
                Graphs
            </Link>
            <button type="button" onClick={handleOpenGraphs}
                className="btn-close ml-1 mt-2 btn-close-white"
                aria-label="Close"></button>
        </li>
    );

    const [dom, setDom] = useState([]);

    useEffect(() => {
        if (openSetting) {
            setDom(prev => [...prev, settings]);
        } else {
            setDom(prev => {
                let arr = [...prev];
                arr = arr.filter(item => {
                    return item.ref.current !== settingRef.current;
                });
                return arr;
            });
            if (location.pathname === "/Settings") {
                navigate("/");
            }
        }
    }, [openSetting]);

    useEffect(() => {
        if (openInventory) {
            setDom(prev => [...prev, Inventory]);
        } else {
            setDom(prev => {
                let arr = [...prev];
                arr = arr.filter(item => {
                    return item.ref.current !== inventoryRef.current;
                });
                return arr;
            });
            if (location.pathname === "/Inventory") {
                navigate("/");
            }
        }
    }, [openInventory]);

    useEffect(() => {
        if (openGraphs) {
            setDom(prev => [...prev, Graphs]);
        } else {
            setDom(prev => {
                let arr = [...prev];
                arr = arr.filter(item => {
                    return item.ref.current !== graphsRef.current;
                });
                return arr;
            });
            if (location.pathname === "/Graphs") {
                navigate("/");
            }
        }
    }, [openGraphs])

    function handleOpenSettings() {
        setOpenSetting(prev => !prev);
    }

    function handleOpenInventory() {
        setOpenInventory(prev => !prev);
    }

    function handleOpenGraphs() {
        setOpenGraphs(prev => !prev);
    }

    return (
        <div>
            <div className='Navbar'>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/">
                            MENU
                        </Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="true" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                                <li className="nav-item mx-2">
                                    <Link className={"nav-link " + (location.pathname === "/" ? "active" : "")}
                                        to="/">
                                        Home
                                    </Link>
                                </li>
                                {isLogin &&
                                    <>
                                        <li className="nav-item mx-2">
                                            <Link
                                                className={"nav-link " + (location.pathname === "/EnterProducts" ? "active" : "")}
                                                to="/EnterProducts">
                                                Enter Product
                                            </Link>
                                        </li>
                                        <li className="nav-item mx-2">
                                            <Link
                                                className={"nav-link"}
                                                ref={suggestionModalRef}
                                                data-bs-toggle="modal"
                                                data-bs-target="#suggestionModal"
                                                to="#">
                                                Suggestion
                                            </Link>
                                        </li>

                                        {
                                            dom.map((item, index) => {
                                                return (
                                                    <React.Fragment key={index}>
                                                        {item}
                                                    </React.Fragment>
                                                );
                                            })
                                        }
                                    </>
                                }
                            </ul>
                            <div className="d-flex profileMenu">
                                <ProfileMenu setOpenSetting={handleOpenSettings} isOpenSetting={openSetting}
                                    setOpenInventory={handleOpenInventory} isOpenInventory={openInventory}
                                    setOpenGraphs={handleOpenGraphs} isOpenGraphs={openGraphs} />
                            </div>
                        </div>

                    </div>
                </nav>
                <SuggestionModal />
                <Alert />
                <Outlet />
            </div>
        </div>
    );
}
