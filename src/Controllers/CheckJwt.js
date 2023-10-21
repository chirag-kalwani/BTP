import url from "../url";
const uri = `${url}/user`;
const check = async (jwt) => {
    try {
        let data = await fetch(uri, {
            method: 'GET',
            headers: { authToken: jwt }
        });
        const res = await data.json();
        return res['User'];
    } catch (e) {
        console.log(e);
        return false;
    }
};

export default check;