import url from "../url";
const fetchData = async (token, name) => {
    try {
        let response = await fetch(`${url}/product/graph`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authToken: token
            },
            body: JSON.stringify({
                name: name,
            }),
        });
        return await response.json();
    } catch (error) {
        console.log("GetGraphDATA: " + error);
    }
};
const GetGraphData = async (token, name) => {
    let data = await fetchData(token, name);
    console.log(data)
    return data
}

export default GetGraphData;