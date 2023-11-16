import React, {useContext, useEffect, useState} from 'react';
import {GetProductsDetails} from "../Controllers/GetProductsDetails";
import check from "../Controllers/CheckJwt";
import UserContext from "../context/UserContext";
import Spinner from "./Spinner";


function SuggestionModal() {
    const context = useContext(UserContext);
    const {FlipLoginStats, setCompleteData, data, toogleWait, wait} = context;
    const [Products, setProducts] = useState([]);
    const token = localStorage.getItem('authToken');

    useEffect(() => {
        toogleWait(true);
        if (!token) FlipLoginStats(false);
        check(token).then((res) => {
            if (!res) FlipLoginStats(false);
            else {
                FlipLoginStats(true);
                if (!data) {
                    GetProductsDetails(token).then(data => {
                        setCompleteData(data);
                        let dt = []
                        for (let d of data) {
                            for (let p of d["product"]) {
                                if (p["days_left"] < 15)
                                    dt.push({
                                        name: p["name"],
                                        days: p["days_left"]
                                    })
                            }
                        }
                        setProducts(dt);
                        toogleWait(false);
                    });
                } else {
                    let dt = []
                    for (let d of data) {
                        for (let p of d["product"]) {
                            if (p["days_left"] < 15)
                                dt.push({
                                    name: p["name"],
                                    days: p["days_left"]
                                })
                        }
                    }
                    setProducts(dt);
                    toogleWait(false);
                }
            }
        });
    }, []);
    return (
        <div>
            <div className="modal fade" id="suggestionModal" tabIndex="-1"
                 aria-labelledby="suggestionModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            You need to buy:
                        </div>
                        {
                            wait ?
                                <Spinner/>
                                :
                                <div className="modal-body">
                                    {
                                        Products.map((pdt, ind) => (
                                            <div key={ind} style={{fontSize: "35px"}}>
                                                {pdt["name"]}: {(pdt["days"] == null) ? 0 : pdt["days"]} days left
                                            </div>
                                        ))
                                    }
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )

        ;
}

export default SuggestionModal;