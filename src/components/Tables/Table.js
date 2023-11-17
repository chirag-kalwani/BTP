import React from 'react';

function Table({ labels = [], series = [], colors = [], l1 = "Category", l2 = "Expenditure", sym = " ₹" }) {
    return (
        <div style={{ color: `${colors != [] ? "white" : "black"}` }} >
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col" style={{color:"lightblue"}}>{l1}</th>
                        <th scope="col" style={{color:"lightblue"}}>{l2}</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        labels.map((val, ind) => {
                            return (
                                <tr key={ind}>
                                    <th style={{ color: `${colors[ind] ? colors[ind] : ""}` }} scope="row">{val}</th>
                                    <td   >{series[ind] ? series[ind] + sym : "0" + sym}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}

export default Table;
