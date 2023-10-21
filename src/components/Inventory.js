import React, { useContext, useEffect, useState, useRef } from 'react';
import Acordion from './Acordion.js';
import UserContext from "../context/UserContext";
import check from "../Controllers/CheckJwt";
import {GetProductsDetails} from "../Controllers/GetProductsDetails";
import Spinner from "./Spinner";
import url from "../url";

function Inventory() {
    const context = useContext(UserContext);
    const { FlipLoginStats, setCompleteData, data, toogleWait, wait } = context;
    const [Products, setProducts] = useState([]);
    const [details, setDetails] = useState([]);
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
                        setProducts(data);
                        toogleWait(false);
                    });
                } else {
                    setProducts(data);
                    toogleWait(false);
                }
            }
        });
    }, []);
    const acordionNum = ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];
    const ref = useRef(null);

    const [newdetails, setnewDetails] = useState({ product_name: "", new_quantity: "" });
    const handleclick = (details) => {
        setDetails(details);
        ref.current.click();
    }
    const onchange = (e) => {
        setnewDetails({ ...newdetails, [e.target.name]: e.target.value });
    }
    const onclick = async () => {
        try {
            const response = await fetch(`${url}/product`, {
                method: "PATCH",
                headers: {
                    'content-Type': 'application/json',
                    authToken: token
                },
                body: JSON.stringify({ name: newdetails.product_name, currentQuantity: Number(newdetails.new_quantity)}),
            });
            if (response.status === 200) {
                window.alert("Product updated successfully");
            }
            setnewDetails({ product_name: "", new_quantity: "" });
        } catch (error) {
            setnewDetails({ product_name: "", new_quantity: "" });
            console.log({ message: error });
        }
    }
    const [focus1, setFocus1] = useState(false);
    const [focus2, setFocus2] = useState(false);
    const errorMessage1="* It is a required field and it should be a valid positive number less than value in your inventory";
    const errorMessage2="* It is a required field";
    const handlefocus1=(e)=>{
        setFocus1(true);
    };
    const handlefocus2=(e)=>{
        setFocus2(true);
    };
    const isvalid=()=>{
        let qn=0,qo=0;
        for(let i=0;i<details.length;i++){
            if(details[i].name===newdetails.product_name){
                qo=details[i].curr_quantity;
                qn=newdetails.new_quantity;
            }
        }
        const regex=/^(0|[1-9][0-9]{0,9})$/;
        if(newdetails.product_name===""||newdetails.new_quantity==="")setIssubmit(false);
        else if(!regex.test(newdetails.new_quantity))setIssubmit(false);
        else if(Number(qn)>Number(qo))setIssubmit(false);
        else{
            setIssubmit(true);
        }
    }
    const [issubmit, setIssubmit] = useState(false);
    useEffect(() => {
        isvalid();
    }, [newdetails])

    return (
        <>
            <div className='inventory'>
                
                <button ref={ref} type="button" className="btn btn-primary invisible" data-bs-toggle="modal"
                    data-bs-target="#exampleModal">
                    Launch demo modal
                </button>

                {/*Modal open only when button click*/}

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">EDIT PRODUCT QUANTITY</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div >
                                    <form >
                                        {/*Select Product*/}
                                        <div className="form-floating mb-3">
                                            <select required={true}  onBlur={handlefocus1} focused={focus1.toString()} id="product" onChange={onchange} value={newdetails.product_name}
                                                name="product_name" className="form-select">
                                                <option  value={""}>Select Product to edit</option>
                                                {details.map((data, index) => <option value={data.name}
                                                    key={index}> {data.name} </option>)}
                                            </select>
                                            <label htmlFor="product">Products</label>
                                            <span className='error'>{errorMessage2}</span>
                                        </div>
                                        {/*Enter Quantity*/}
                                        <div className="form-floating mb-3">
                                            <input pattern={"^(0|[1-9][0-9]{0,9})$"} required={true}  onBlur={handlefocus2} focused={focus2.toString()} type="text" name="new_quantity" id="quantity" placeholder='Not Used'
                                                className="form-control" value={newdetails.new_quantity}
                                                onChange={onchange} />
                                            <label htmlFor="quantity">Edit Quantity </label>
                                            <span className='error'>{errorMessage1}</span>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" disabled={!issubmit}  onClick={onclick} className="btn btn-primary">Submit</button>
                            </div>
                            <p className='error2'>* if submit button is disabled check the form fields ,they are required and should be valid</p>
                        </div>
                    </div>
                </div>

                <h2 className='inventh2'>This Month Inventory</h2>
                {!wait && Products.map((data, index) =>
                    <div className="accordion" id="accordionExample">
                        <Acordion key={index} category={data.category} details={data.product}  number={acordionNum[index]}
                            handleclick={handleclick} />
                    </div>
                )}
                <Spinner color="light" />

            </div>
        </>
    );
}

export default Inventory;