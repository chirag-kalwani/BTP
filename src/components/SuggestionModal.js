import React, { useContext, useState, useEffect } from 'react';
import { GetProductsDetails } from "../Controllers/GetProductsDetails";
import check from "../Controllers/CheckJwt";
import UserContext from "../context/UserContext";



function SuggestionModal() {
    const context = useContext(UserContext);
    const { FlipLoginStats, setCompleteData, data, toogleWait, wait } = context;
    const [Products, setProducts] = useState([]);
    const token = localStorage.getItem('authToken');

    useEffect(() => {
        if (Products.length) { console.log(Products); return; }
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
    }, [Products]);
    return (
        <div>
            <div className="modal fade" id="suggestionModal" tabIndex="-1" aria-labelledby="suggestionModalLabel"
                aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            You need to buy:
                        </div>
                        <div className="modal-body">
                            {
                                Products.map((pdt, ind) => (
                                    <div key={ind} style={{ fontSize: "35px" }}>
                                        {pdt["name"]}: {pdt["days"]} days left
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SuggestionModal;