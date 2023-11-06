import React, {useContext, useEffect} from 'react';
import check from "../Controllers/CheckJwt";
import UserContext from "../context/UserContext";


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
        <div>
            <h1>Home Page</h1>
        </div>
    );
}

export default Home;
