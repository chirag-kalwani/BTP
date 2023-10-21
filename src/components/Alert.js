import React, {useContext} from "react";
import UserContext from "../context/UserContext";
export default function Alert() {
    const context = useContext(UserContext);
    const {alert} = context;
    return (
        <>
            {alert.show && <div className={`alert alert-${alert.type}`} role="alert">
                {alert.msg}
            </div>}
        </>
    );
}
