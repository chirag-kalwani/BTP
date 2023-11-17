import React, { useContext, useEffect, useState } from 'react';
import { GetProductsDetails } from "../Controllers/GetProductsDetails";
import check from "../Controllers/CheckJwt";
import UserContext from "../context/UserContext";
import Spinner from "./Spinner";
import Table from './Tables/Table';


function SuggestionModal({open}) {
    const context = useContext(UserContext);
    const { FlipLoginStats, setCompleteData, data, toogleWait, wait } = context;
    const [names, setNames] = useState([]);
    const [days, setDays] = useState([]);
    const token = localStorage.getItem('authToken');


    function setData(data) {
        setCompleteData(data);
        let n = [], dt = []
        for (let d of data)
            for (let p of d["product"])
                if (p["days_left"] < 15) {
                    n.push(p["name"])
                    dt.push(p["days_left"])
                }
        setNames(n);
        setDays(dt);
        toogleWait(false);
    }

    useEffect(() => {
        toogleWait(true);
        if (!token) FlipLoginStats(false);
        check(token).then((res) => {
            if (!res) FlipLoginStats(false);
            else {
                if (!data) {
                    GetProductsDetails(token).then(data => {
                        setData(data);
                    });
                } else {
                    setData(data);
                }
            }
        });
    }, [open]);
    return (
        <div>
            <div className="modal fade" id="suggestionModal" tabIndex="-1"
                aria-labelledby="suggestionModalLabel"
                aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content" style={{backgroundColor:"#696969"}}>
                        <div className="modal-header" style={{color:"lightblue"}}>
                            You need to buy:
                        </div>
                        <Spinner />
                        <Table labels={names} series={days} sym=" days left" l1="Products" l2="Expected" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SuggestionModal;