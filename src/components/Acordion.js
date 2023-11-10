import React from 'react'

const Acordion = (props) => {
    let category = props.category;
    let arr = ["Vegitables", "Fruits", "Dairy Products"];

    function check(a) {
        return arr.find((element) => element === a);
    }

    let details = props.details;
    let nmber = props.number;
    const heading = `heading${nmber}`;
    const collapse = `collapse${nmber}`;
    const collapse2 = `#collapse${nmber}`;

    return (
        <div>
            <div className="accordion-item">
                <h2 className="accordion-header" id={heading}>
                    <button className="accordion-button acbtn" type="button" data-bs-toggle="collapse"
                            data-bs-target={collapse2} aria-expanded="false" aria-controls={collapse}>
                        <strong>{category}</strong>
                    </button>
                </h2>
                <div id={collapse} className="accordion-collapse collapse" aria-labelledby={heading}
                     data-bs-parent="#accordionExample">
                    <div className="accordion-body acbody">
                        <table className="table">
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
                            </tr>
                            </thead>
                            <tbody>
                            {details.map((data, index) => {
                                return (
                                    <tr key={index}>
                                        <th scope='row'>{index + 1}</th>
                                        <td>
                                            {data.name}
                                            <div className="d-inline" style={{cursor: "pointer"}}>
                                                <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none"
                                                     xmlnsXlink="http://www.w3.org/1999/xlink">
                                                    {
                                                        check(category) ?
                                                            <a href={`https://www.amazon.in/s?k=${data.name}`}
                                                               target='_blank'
                                                               rel="noreferrer">
                                                                <text x="0" y="15" fill="black">Purchase Link</text>
                                                            </a> :
                                                            <a href={`https://www.bigbasket.com/ps/?q=${data.name}`}
                                                               target='_blank'
                                                               rel="noreferrer">
                                                                <text x="0" y="15" fill="black">Purchase Link</text>
                                                            </a>
                                                    }
                                                    <path
                                                        d="M15.197 3.35462C16.8703 1.67483 19.4476 1.53865 20.9536 3.05046C22.4596 4.56228 22.3239 7.14956 20.6506 8.82935L18.2268 11.2626M10.0464 14C8.54044 12.4882 8.67609 9.90087 10.3494 8.22108L12.5 6.06212"
                                                        stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
                                                    <path
                                                        d="M13.9536 10C15.4596 11.5118 15.3239 14.0991 13.6506 15.7789L11.2268 18.2121L8.80299 20.6454C7.12969 22.3252 4.55237 22.4613 3.0464 20.9495C1.54043 19.4377 1.67609 16.8504 3.34939 15.1706L5.77323 12.7373"
                                                        stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
                                                </svg>
                                            </div>
                                        </td>
                                        <td>{data["avg_usage"]}</td>
                                        <td>{data.price}</td>
                                        <td>{data["curr_quantity"]}{" "}{data.unit}</td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Acordion