import React, {useContext, useState} from 'react';
import LoginRegisterNavbar from "./LoginRegisterNavbar";
import {Link, useNavigate} from "react-router-dom";
import UserContext from "../context/UserContext";
import url from "../url";
function Login() {
    const context = useContext(UserContext);
    const history = useNavigate();
    const {showAlert, FlipLoginStats} = context;
    const server = url;
    const [data, setData] = useState({email: "", password: ""});
    const handleChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        });
    };
    const handleSubmit = async () => {
        try {
            let res = await fetch(server + '/user/login', {
                method: "POST",
                body: JSON.stringify({
                    email: data.email.toString().toLowerCase(),
                    password: data.password
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            let jsonData = await res.json();
            if (jsonData['authToken']) {
                localStorage.setItem('authToken', jsonData['authToken']);
                localStorage.setItem('name', jsonData['User']['name']);
                showAlert('Login successfully', "success");
                FlipLoginStats(true);
                history('/');
            } else {
                showAlert('Invalid credentials', "danger");
            }
        } catch (err) {
            showAlert('Internal server error', "danger");
        }
    };
    return (
        <div className="loginContainer">
            <div className="image">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                     className="img-fluid" alt="Sample"/>
            </div>
            <div>
                <LoginRegisterNavbar/>
                <div className="tab-content">
                    <div className="tab-pane active">
                        <form>
                            {/*Email input*/}
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="email"
                                       onChange={handleChange} placeholder="Email address" name="email"/>
                                <label htmlFor="email">Email address</label>
                            </div>

                            {/*Password input*/}
                            <div className="form-floating">
                                <input type="password" className="form-control" id="password"
                                       onChange={handleChange} placeholder="Password" name="password"/>
                                <label htmlFor="password">Password</label>
                            </div>

                            <div className="row mb-4">
                                <div className="col-md-6 d-flex justify-content-center">
                                    <Link to="/login"></Link>
                                </div>
                            </div>

                            {/*Submit button */}
                            <button type="button" onClick={handleSubmit} className="btn btn-primary btn-block mb-4">Sign
                                in
                            </button>

                            {/*Register buttons */}
                            <div className="text-center">
                                <p>Not a member? <Link to="/register">Register</Link></p>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Login;
