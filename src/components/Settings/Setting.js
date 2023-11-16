import React, {useRef, useState} from 'react';
import url from "../../url";

function Setting(props) {
    const [name, setName] = useState("Chirag Kalwani");
    const [oldPassword, setOldPassword] = useState("");
    const ref = useRef(null);
    const ref1 = useRef(null);
    const token = localStorage.getItem('authToken');
    const handleclick = (id) => {
        if (!id)
            ref.current.click();
        else
            ref1.current.click();
    }


    const updateNameChange = async () => {
        try {
            const res = await fetch(`${url}/user/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'authToken': token
                },
                body: JSON.stringify({name})
            });
            const data = await res.json();
            if (data['status'] === 'success') {
                alert('Profile updated successfully');
            } else {
                alert('Error in updating profile');
            }
        } catch (e) {
            console.log(e);
        }
    }

    const updatePasswordChange = async () => {
        // verify old password

        //  update new password
    }

    const mainCss = {
        background: "#423f3e",
        padding: "50px 25px 0 25px",
        borderRadius: "10px",
        width: "50%",
        height: "fit-content",
    }

    return (
        <div className="form-container d-flex justify-content-center">

            <div style={{...mainCss}}>

                {/*Modal For Update Name*/}
                <button ref={ref} type="button" className="btn btn-primary invisible" data-bs-toggle="modal"
                        data-bs-target="#exampleModal">
                </button>
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                     aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content bg-dark">
                            <div className="modal-header text-light">
                                <h5 className="modal-title" id="exampleModalLabel">Update Your Profile</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                            </div> 
                            <div className="modal-body text-light">
                                <div className="d-flex mt-3 align-items-center">
                                    <label style={{width: "125px"}} className="text-light" htmlFor="updateName">Full
                                        Name</label>
                                    <input
                                        className="form-control w-50 bg-white text-dark"
                                        type="text"
                                        id="updateName"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer justify-content-center">
                                <button onClick={updateNameChange} type="button"
                                        className="btn btn-outline-primary">Update
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/*Modal For Update password*/}
                <button ref={ref1} type="button" className="btn btn-primary invisible" data-bs-toggle="modal"
                        data-bs-target="#passwordModal">
                </button>
                <div className="modal fade" id="passwordModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                     aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content bg-dark">
                            <div className="modal-header text-light">
                                <h5 className="modal-title" id="exampleModalLabel">Update Your Password</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                            </div>
                            <div className="modal-body text-light">
                                <div className="d-flex mt-3 align-items-center">
                                    <label style={{width: "125px"}} className="text-light" htmlFor="updatePassword">old
                                        Password</label>
                                    <input
                                        className="form-control w-50 bg-white text-dark"
                                        type="password"
                                        id="updatePassword"

                                        onChange={(e) => setOldPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer justify-content-center">
                                <button onClick={updatePasswordChange} type="button"
                                        className="btn btn-outline-primary">Update
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="m-5 text-white">
                    <h1>Personal Details</h1>
                    <div className="d-flex gap-5 align-items-center">
                        <img
                            style={{borderRadius: '50%', width: '100px', height: '100px'}}
                            src="https://www.w3schools.com/howto/img_avatar.png"
                            alt="Avatar"/>
                        <div>
                            <h4>Chirag Kalwani</h4>
                            <h6>chirag@gmail.com</h6>
                        </div>
                    </div>
                    <form className="mt-5">
                        <div className="d-flex mt-3 align-items-center gap-5">
                            <label style={{width: "125px"}} htmlFor="name">Full Name</label>
                            <input
                                className="form-control"
                                type="text"
                                id="name"
                                value="Chirag Kalwani"
                                disabled/>
                        </div>
                        <div className="d-flex mt-3 align-items-center gap-5">
                            <label style={{width: "125px"}} htmlFor="email">Email</label>
                            <input
                                className="form-control"
                                type="text"
                                id="email"
                                value="Chirag@gmail.com"
                                disabled/>
                        </div>
                    </form>
                    <button onClick={() => handleclick(0)} className="btn btn-outline-primary m-4"> Update Profile
                    </button>
                    <button onClick={() => handleclick(1)} className="btn btn-outline-primary m-4"> Edit Password
                    </button>
                </div>

            </div>
        </div>
    );
}

export default Setting;