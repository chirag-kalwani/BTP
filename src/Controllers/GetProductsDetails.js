// const token = localStorage.getItem('authToken');
import url from "../url";
const fetchData = async (token) => {
    try {
        let response = await fetch(`${url}/product`, {
            method: 'GET',
            headers: {authToken: token}
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
};
const makeitems = (unique_categories, details) => {
    let items = [];
    for (let i = 0; i < unique_categories.length; i++) {
        let obj = {
            category: unique_categories[i],
            product: []
        };
        for (let j = 0; j < details.length; j++) {
            let obj2 = {};
            if (details[j].category === unique_categories[i]) {
                obj2 = Object.assign(obj2, details[j]);
                obj.product.push(obj2);
            }
        }
        items.push(obj);
    }
    return items;
}

async function getAllProducts(token){
    let response = await fetch(`${url}/getAllItems`);
    return await response.json();
}

async function GetProductsDetails(token) {
    let data = await fetchData(token);
    return makeitems([...new Set(data['Inventory'].map((element) => element.category))], data['Inventory']);
}

export {GetProductsDetails, getAllProducts};