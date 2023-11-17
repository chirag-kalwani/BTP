import React from 'react'
import Table from './Tables/Table'
function Top3ProductModal({BrandList,usersNo,productName}){

  return (
    <div className="modal fade" id="top3product" tabIndex="-1" aria-labelledby="top3productLabel"
                    aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content" style={{backgroundColor:"#696969"}}>
                            <div className="modal-header">
                                <h5 className="modal-title" id="top3productLabel" style={{color:"lightblue"}}>Top Brands for {productName}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div>
                                <Table labels={BrandList} series={usersNo} sym=" users " l1="Brand" l2="No. of users" />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close
                                </button>
                                {/* <button type="button" disabled={!issubmit} onClick={onclick}
                                    className="btn btn-primary">Submit
                                </button> */}
                            </div>

                        </div>
                    </div>
                </div>

  )
}

export default Top3ProductModal