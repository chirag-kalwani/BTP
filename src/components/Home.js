import React, {useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import check from "../Controllers/CheckJwt";
import UserContext from "../context/UserContext";
import "../CSS/Home.css"

function Home() {
    const token = localStorage.getItem('authToken');
    const context = useContext(UserContext);
    const {FlipLoginStats} = context;
    useEffect(() => {
        check(token).then((res) => {
            if (res) {
                FlipLoginStats(true);
            }
        });
    }, []);
    return (
        <div className="home-container">
            <h1 className="welcome-message">Welcome to Household Inventory Management</h1>
            <p className="description">
                Keep track of your household expenses and manage your inventory seamlessly.
            </p>
            <div className="features">
                <h2>Features:</h2>
                <ul>
                    <li>Enter and track your household purchases.</li>
                    <li>View current month expenditure in a pie chart by category.</li>
                    <li>Explore last 6 months expenditure in a line graph for specific products.</li>
                </ul>
            </div>
            <div className="get-started">
                <h2>Get Started:</h2>
                <p>
                    To start managing your household inventory,{' '}
                    <Link to="/register">create an account</Link> or {' '}
                    <Link to="/login">log in</Link>.
                </p>
            </div>
        </div>
    );
}

export default Home;
