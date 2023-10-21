import React, {useContext} from 'react';
import profilePic from "../assets/profilePic.png";
import {Link} from "react-router-dom";
import UserContext from "../context/UserContext";

function ProfileMenu() {
    const context = useContext(UserContext);
    const {FlipLoginStats, isLogin} = context;
    const handleClick = () => FlipLoginStats(false);
    return (
        <>
            {isLogin && <div className="dropdown-center" data-bs-theme="dark">
                <button className=" btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown">
                    <img width="30" className="mx-2" src={profilePic} alt="logo"/>
                    <span className="text-light user-select-none" role="button">{localStorage.getItem('name')}</span>
                </button>
                <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Settings</a></li>
                    <li><span onClick={handleClick} className="dropdown-item" role="button">Logout</span></li>
                </ul>
            </div>}
            {!isLogin &&
                <Link to='./login' type="button" className="btn btn-primary btn-block">Log in / Register</Link>
            }
        </>
    );
}

export default ProfileMenu;