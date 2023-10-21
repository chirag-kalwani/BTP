import React, {useContext, useEffect, useState} from 'react';
import check from "../Controllers/CheckJwt";
import UserContext from "../context/UserContext";
import PieChart from "./Graphs/PieChart";
import {getAllProducts, GetProductsDetails} from "../Controllers/GetProductsDetails";
import Table from "./Tables/Table";
import Spinner from "./Spinner";
import GetGraphData from "../Controllers/GetGraphData";
import BarChart from "./Graphs/BarChart";

function Graphs() {
    const [labels, setLabels] = useState([]);
    const [series, setSeries] = useState([]);
    const [xaxis, setxaxis] = useState([]);
    const [yaxis, setyaxis] = useState([]);

    const [loading, setLoading] = useState({pie: true, bar: true});
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [details, setDetail] = useState({
        category: "", product_name: "",
    });

    const colors = ['rgb(0, 143, 251)', 'rgb(0, 227, 150)', 'rgb(254, 176, 25)', 'rgb(255, 69, 96)', 'rgb(119, 93, 208)', 'rgb(0, 143, 251)', 'rgb(0, 227, 150)'];

    const context = useContext(UserContext);
    const {FlipLoginStats, setCompleteData, data, toogleWait, wait, allDetails, setCompleteDetails} = context;
    const token = localStorage.getItem('authToken');


    const setData = (data) => {
        setSeries([]);
        setLabels([]);
        for (const ele of data) {
            setLabels(prev => [...prev, ele['category']]);
            let sum = 0;
            for (const product of ele['product']) sum += product['price'];
            setSeries(prev => [...prev, sum]);
        }
    };

    const onProductSelect = (e) => {
        setDetail({...details, [e.target.name]: e.target.value});
    }
    const onCategorySelect = (e) => {
        setDetail({...details, [e.target.name]: e.target.value});
        const temp = categories.filter(x => x.category === e.target.value);
        setProducts(temp[0].items);
    }

    const showGraph = () => {
        setLoading(prev => {
            return {...prev, bar: true}
        })
        toogleWait(true);
        GetGraphData(token, details['product_name']).then(data => {
            setxaxis([]);
            setyaxis([]);
            if (data['data'].length > 0)
                for (let ele of data['data']) {
                    setxaxis(prev => [...prev, ele['month']]);
                    setyaxis(prev => [...prev, ele['price']]);
                }
            setLoading(prev => {
                return {...prev, bar: false}
            });
            toogleWait(false);
        });
    }

    const fetchAllData = () => {
        if (!allDetails) {
            try {
                getAllProducts(token).then(json => {
                    setCategories(json['Items']);
                    setCompleteDetails(json['Items']);
                })
            } catch (error) {
                console.log(error);
            }
        } else {
            setCategories(allDetails);
        }
    }

    useEffect(() => {
        toogleWait(true);
        setLoading(prev => {
            return {...prev, pie: true}
        })
        if (!token) FlipLoginStats(false);
        check(token).then((res) => {
            if (!res) FlipLoginStats(false);
            else {
                FlipLoginStats(true);
                if (!data) {
                    GetProductsDetails(token).then(data => {
                        setCompleteData(data);
                        setData(data);
                        toogleWait(false);
                        setLoading(prev => {
                            return {...prev, pie: false}
                        })
                    });
                } else {
                    setData(data);
                    toogleWait(false);
                    setLoading(prev => {
                        return {...prev, pie: false}
                    })
                }
                fetchAllData();
            }
        });
    }, []);


    return (
        <>
            <div className="Graph pt-5">
                <div className="row">
                    <div className="col-lg-8 col-sm-12 col-md-12">
                        {!loading.pie && <PieChart colors={colors} labels={labels} series={series}
                                                   title={'Monthly expenditure category wise'}/>}
                        {loading.pie && <Spinner color="light"/>}
                    </div>
                    <div className="col-lg-3 col-sm-12 col-md-12">
                        <Table labels={labels} colors={colors} series={series}/>
                    </div>
                </div>
                <hr className="text-white"/>
                <div className="row">
                    <div className="col-lg-6 col-sm-12 col-md-12">
                        <form className="form-group m-lg-5">
                            {/*Select Category*/}
                            <div className="form mb-3 w-75">
                                <label htmlFor="category" className="text-white">Category</label>
                                <select onChange={onCategorySelect} id="category" className="form-select"
                                        name="category">
                                    <option value="">Select Category</option>
                                    {categories.map((data, index) => <option value={data.category}
                                                                             key={index}>{data.category}</option>)}
                                </select>
                            </div>

                            {/*Select Product*/}
                            <div className="form mb-3 w-75">
                                <label htmlFor="product" className="text-white">Products</label>
                                <select onChange={onProductSelect} id="product" className="form-select"
                                        name="product_name">
                                    <option value="">Select Product</option>
                                    {products.map((data, index) => <option value={data.name}
                                                                           key={index}> {data.name} </option>)}
                                </select>
                            </div>
                            <button type="button"
                                    className="btn btn-primary btn-block mb-4" onClick={showGraph}> Show graph
                            </button>
                        </form>
                    </div>
                    <div className="col-lg-6 col-sm-12 col-md-12">
                        {!loading.bar && <BarChart xaxis={xaxis} yaxis={yaxis} name={details.product_name}/>}
                        {loading.bar && <Spinner color="light"/>}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Graphs;