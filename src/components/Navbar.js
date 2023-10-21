import React, {useContext} from "react";
import ProfileMenu from "./ProfileMenu";
import UserContext from "../context/UserContext";
import {Link, Outlet, useLocation} from "react-router-dom";
import Alert from "./Alert";

export default function Navbar() {
    const context = useContext(UserContext);
    const {isLogin} = context;
    const location = useLocation();
    return (
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
                                            className={"nav-link " + (location.pathname === "/Graphs" ? "active" : "")}
                                            to="/Graphs">
                                            Graphs
                                        </Link>
                                    </li>
                                    <li className="nav-item mx-2">
                                        <Link
                                            className={"nav-link " + (location.pathname === "/Inventory" ? "active" : "")}
                                            to="/Inventory">
                                            Inventory
                                        </Link>
                                    </li>
                                </>
                            }
                        </ul>
                        <div className="d-flex profileMenu">
                            <ProfileMenu/>
                        </div>
                    </div>
                </div>
            </nav>
            <Alert/>
            <Outlet/>
        </div>
    );
}
