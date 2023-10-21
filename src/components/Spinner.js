import React, {useContext} from 'react';
import UserContext from "../context/UserContext";

function Spinner({color}) {
    const context = useContext(UserContext);
    const {wait} = context;
    return (
        <>
            {wait && <div className="d-flex justify-content-center m-lg-5">
                <svg className="spinner" width="65px" height="65px" viewBox="0 0 66 66"
                     xmlns="http://www.w3.org/2000/svg">
                    <circle className="path" fill="none" strokeWidth="6" strokeLinecap="round" cx="33" cy="33"
                            r="30"></circle>
                </svg>
            </div>}
        </>
    );
}

export default Spinner;