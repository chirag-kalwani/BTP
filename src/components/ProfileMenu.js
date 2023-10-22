import React, {useContext} from 'react';
import profilePic from "../assets/profilePic.png";
import {Link} from "react-router-dom";
import UserContext from "../context/UserContext";

function ProfileMenu({setOpenSetting, isOpenSetting, setOpenInventory, isOpenInventory, setOpenGraphs, isOpenGraphs}) {
    const context = useContext(UserContext);
    const {FlipLoginStats, isLogin} = context;
    const handleClick = () => FlipLoginStats(false);
    return (
        <div className="mx-5">
            {isLogin && <div className="dropdown-center" data-bs-theme="dark">
                <button className=" btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown">
                    <img width="30" className="mx-2" src={profilePic} alt="logo"/>
                    <span className="text-light user-select-none" role="button">{localStorage.getItem('name')}</span>
                </button>
                <ul className="dropdown-menu">
                    {!isOpenSetting && <li>
                        <Link onClick={() => setOpenSetting()} className="dropdown-item" to="/Settings">Settings</Link>
                    </li>}
                    {!isOpenInventory && <li>
                        <Link onClick={() => setOpenInventory()} className="dropdown-item"
                              to="/Inventory">Inventory</Link>
                    </li>}
                    {!isOpenGraphs && <li>
                        <Link onClick={() => setOpenGraphs()} className="dropdown-item"
                              to="/Graphs">Graphs</Link>
                    </li>}
                    <li><span onClick={handleClick} className="dropdown-item" role="button">Logout</span></li>
                </ul>
            </div>}
            {!isLogin &&
                <Link to='./login' type="button" className="btn btn-primary btn-block">Log in / Register</Link>
            }
        </div>
    );
}

export default ProfileMenu;