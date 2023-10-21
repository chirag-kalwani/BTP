import React from 'react'
import {useState, useRef} from 'react';

const Acordion = (props) => {
    let category = props.category;
    let details = props.details;
    let nmber = props.number;
    const heading = `heading${nmber}`;
    const collapse = `collapse${nmber}`;
    const collapse2 = `#collapse${nmber}`;

    return (
        <>
            <div className="accordion-item">
                <h2 className="accordion-header" id={heading}>
                    <button className="accordion-button" type="button" data-bs-toggle="collapse"
                            data-bs-target={collapse2} aria-expanded="false" aria-controls={collapse}>
                        <strong>{category}</strong>
                    </button>
                </h2>
                <div id={collapse} className="accordion-collapse collapse" aria-labelledby={heading}
                     data-bs-parent="#accordionExample">
                    <div className="accordion-body acbody">
                        <table className="table table-hover">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Product</th>
                                <th scope="col">Usage</th>
                                <th scope="col">Expense(Rs)
                                </th>
                                <th scope="col">Quantity left
                                    <button onClick={() => {
                                        props.handleclick(details)
                                    }} className='btn2'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                             fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
                                            <path
                                                d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
                                        </svg>
                                    </button>
                                </th>
                                <th scope='col'> Link For Purchase</th>
                            </tr>
                            </thead>
                            <tbody>
                            {details.map((data, index) => {
                                return (
                                    <tr key={index}>
                                        <th scope='row'>{index + 1}</th>
                                        <td>{data.name}</td>
                                        <td>{data.avg_usage}</td>
                                        <td>{data.price}</td>
                                        <td>{data.curr_quantity}{" "}{data.unit}</td>
                                        <td style={{paddingLeft: "50px"}}>
                                            <a href={`https://www.amazon.in/s?k=${data.name}`} target='_blank' rel="noreferrer">
                                                link
                                            </a>
                                        </td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Acordion