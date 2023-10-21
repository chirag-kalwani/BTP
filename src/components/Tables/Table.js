import React from 'react';

function Table({labels, series, colors}) {
    return (
        <div>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">Category</th>
                    <th scope="col">Expenditure</th>
                </tr>
                </thead>
                <tbody>
                {
                    labels.map((val, ind) => {
                        return (
                            <tr key={ind}>
                                <th style={{color: `${colors[ind]}`}} scope="row">{val}</th>
                                <td>{'₹ ' + series[ind]}</td>
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
