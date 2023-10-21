import React from 'react';
import {Link,  useLocation} from "react-router-dom";

function LoginRegisterNavbar() {
    const location = useLocation();
    return (
        <ul className="nav nav-pills nav-justified mb-3"  role="tablist">
            <li className="nav-item" role="presentation">
                <Link className={"nav-link " + (location.pathname === "/login" ? "active" : "")} to="/login" role="tab">Login</Link>
            </li>
            <li className="nav-item" role="presentation">
                <Link className={"nav-link " + (location.pathname === "/register" ? "active" : "")} to="/register" role="tab" >Register</Link>
            </li>
        </ul>
    );
}

export default LoginRegisterNavbar;