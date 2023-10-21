import UserContext from "./UserContext";

import {useState} from "react";

const AlertState = ({children}) => {
    const [alert, setAlert] = useState({show: false, msg: 'this is error', type: 'success'});
    const [isLogin, setIsLogin] = useState(false);
    const [data, setData] = useState(null);
    const [allDetails, setAlldetails] = useState(null);
    const [wait, setWait] = useState(false);
    const showAlert = (msg, type) => {
        setAlert({
            show: true, msg: msg, type: type
        });
        setTimeout(() => {
            setAlert({
                show: false, msg: '', type: ''
            })
        }, 2000);
    }
    const FlipLoginStats = async (stats) => {
        if (!stats) localStorage.removeItem('authToken');
        setIsLogin(stats);
        if (!stats) window.location.href = '/';
    }
    const setCompleteData = (data) => {
        setData(data);
    }
    const setCompleteDetails = (details) => {
        setAlldetails(details);
    }

    const toogleWait = (set) => {
        setWait(set);
    }
    return (
        <UserContext.Provider
            value={{
                showAlert, alert,
                FlipLoginStats, isLogin,
                setCompleteDetails, allDetails,
                setCompleteData, data,
                toogleWait, wait
            }}>
            {children}
        </UserContext.Provider>
    )
};

export default AlertState;
