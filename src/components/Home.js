import React, { useContext, useEffect } from 'react';
import check from "../Controllers/CheckJwt";
import UserContext from "../context/UserContext";


function Home() {
    const token = localStorage.getItem('authToken');
    const context = useContext(UserContext);
    const { FlipLoginStats } = context;
    useEffect(() => {
        check(token).then((res) => {
            if (res) {
                FlipLoginStats(true);
            }
        });
    }, []);
    const img1 = require('../assets/img1.jpg');
    const img5 = require('../assets/img5.gif');
    return (
        <div className="Home">
            <div id="carouselExampleIndicators" className="carousel slide carousel-fade" data-mdb-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0"
                        className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
                        aria-label="Slide 2"></button>

                </div>
                <div className="carousel-inner">
                    <div className="carousel-item ">
                        <img src={img1} className="bg-image"
                            alt="Image for app" />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Inventory</h5>
                            <p>GroceWise will keep you on track of your inventory</p>
                        </div>
                    </div>
                    <div className="carousel-item active">
                        <img src={img5} className="bg-image"
                            alt="Image for app" />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Graphs/PieCahrt</h5>
                            <p>GroceWise will manage your Your daily expenses</p>
                        </div>
                    </div>

                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            <div className="plate">
                <p className="script"><span>Your One stop Solution to keep track of</span></p>
                <p className="shadow text1">Grocery (inventory)</p>

                <p className="shadow text3">and Expenses</p>
                <p className="script"><span> - grocewise</span></p>
            </div>
        </div>
    );
}

export default Home;
