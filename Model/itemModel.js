const mongoose = require('mongoose');
const database_link="mongodb+srv://database_admin:LYTdPrD2KafHPy8d@cluster0.vsuxn2r.mongodb.net/?retryWrites=true&w=majority";
// const database_password=ElDf7JgLLWdyHN8Q;


// Connect to mongodb database
mongoose.connect(database_link)
.then(function(db){
    console.log('All Products Database Successfully Connected');
})
.catch(function(err){
    console.log('All Products Database Error',err);
})

const itemSchema = new mongoose.Schema({
    category :{
        type: String
    },
    items :{
        type: Map,
        of: mongoose.Schema({unit: {type: String}, topBrands: {type: Map, of: Number}})
    }
});

const itemModel = mongoose.model('itemsModel',itemSchema);

// Units Used
// Kilo-Gram -> Kilogram , Gram -> Gram , L -> Litre , ML -> MilliLitre , NO -> Number

// (async function addItem(){
//     await itemModel.deleteMany();
//     const cat1 = {
//         category : "Grocery",
//         items :{"Rice": {unit: "Kilo-Gram"},
//                 "Flour": {unit: "Kilo-Gram"},
//                 "Pulse": {unit: "Kilo-Gram"},
//                 "Almond": {unit: "Gram"},
//                 "Cashew": {unit: "Gram"},
//                 "Oil": {unit: "Litre"},
//                 "Masala": {unit: "Gram"},
//                 "Salt": {unit: "Kilo-Gram"},
//                 "Sugar": {unit: "Kilo-Gram"},
//                 "Tomato Sauce": {unit: "Kilo-Gram"},
//                 "Honey": {unit: "Kilo-Gram"},
//                 "Cereals": {unit: "Kilo-Gram"},
//                 "Tea": {unit: "Kilo-Gram"},
//                 "Coffee": {unit: "Gram"}}      
//     };

//     const cat2 = {
//         category : "Grooming Products",
//         items : {"Shampoo": {unit: "Milli-Litre"},
//                 "Conditioner": {unit: "Milli-Litre"},
//                 "Soaps": {unit: "Number"},
//                 "Face Wash": {unit: "Milli-Litre"},
//                 "Perfume": {unit: "Number"},
//                 "Deodorant": {unit: "Number"},
//                 "Talcum Powder": {unit: "Gram"},
//                 "Hair Oil": {unit: "Milli-Litre"},
//                 "Body Lotion": {unit: "Milli-Litre"}}
//     };

//     const cat3 = {
//         category : "Cleaning",
//         items : {"Detergent Powder": {unit: "Kilo-Gram"},
//                 "Surface Cleaners": {unit: "Milli-Litre"},
//                 "Utensil Cleaners": {unit: "Number"},
//                 "Toilet Cleaners": {unit: "Milli-Litre"},
//                 "Handwash": {unit: "Milli-Litre"}}
//     };

//     const cat4 = {
//         category : "Snacks/Instant-Foods",
//         items : {"Chips": {unit: "Number"},
//                 "Kurkure": {unit: "Number"},
//                 "Bhujiya": {unit: "Kilo-Gram"},
//                 "Nachos": {unit: "Number"},
//                 "Makhana": {unit: "Gram"},
//                 "Soya Sticks": {unit: "Number"},
//                 "Popcorn": {unit: "Number"},
//                 "Cold Drink": {unit: "Milli-Litre"},
//                 "Juices": {unit: "Milli-Litre"},
//                 "Energy Drink": {unit: "Milli-Litre"},
//                 "Nutella": {unit: "Gram"}}
//     };

//     const cat5 = {
//         category : "Vegetables",
//         items : {"Onion": {unit: "Kilo-Gram"},
//                 "Potato": {unit: "Kilo-Gram"},
//                 "Tomato": {unit: "Kilo-Gram"},
//                 "Coriander": {unit: "Gram"},
//                 "Green Chilli": {unit: "Gram"},
//                 "Broccoli": {unit: "Kilo-Gram"},
//                 "Carrot": {unit: "Kilo-Gram"},
//                 "Cauliflower": {unit: "Kilo-Gram"},
//                 "Cabbage": {unit: "Kilo-Gram"},
//                 "Lady Finger": {unit: "Kilo-Gram"},
//                 "Capsicum": {unit: "Kilo-Gram"},
//                 "Peas": {unit: "Kilo-Gram"},
//                 "Spinach": {unit: "Kilo-Gram"},
//                 "Cucumber": {unit: "Kilo-Gram"},
//                 "Ginger": {unit: "Gram"},
//                 "Garlic": {unit: "Gram"},
//                 "Lemon": {unit: "Number"}}
//     };

//     const cat6 = {
//         category : "Fruits",
//         items : {"Coconut": {unit: "Number"},
//                 "Grapes": {unit: "Kilo-Gram"},
//                 "Orange": {unit: "Kilo-Gram"},
//                 "Banana": {unit: "Kilo-Gram"},
//                 "Watermelon": {unit: "Kilo-Gram"},
//                 "Mango": {unit: "Kilo-Gram"},
//                 "Apple": {unit: "Kilo-Gram"},
//                 "Pomegranate": {unit: "Kilo-Gram"},
//                 "Guava": {unit: "Kilo-Gram"},
//                 "Chikoo": {unit: "Kilo-Gram"},
//                 "Lichi": {unit: "Kilo-Gram"},
//                 "Papaya": {unit: "Kilo-Gram"},
//                 "Pineapple": {unit: "Kilo-Gram"}}
//     };
//     const cat7 = {
//         category : "Dairy Products",
//         items : {"Ghee": {unit: "Kilo-Gram"},
//                 "Milk": {unit: "Litre"},
//                 "Cheese": {unit: "Gram"},
//                 "Butter": {unit: "Gram"},
//                 "Panneer": {unit: "Gram"},
//                 "Choclate": {unit: "Number"},
//                 "Ice Cream": {unit: "Gram"}}
//     };
//     let addedItem = await itemModel.create(cat1);
//     let addedItem1 = await itemModel.create(cat2);
//     let addedItem2 = await itemModel.create(cat3);
//     let addedItem3 = await itemModel.create(cat4);
//     let addedItem4 = await itemModel.create(cat5);
//     let addedItem5 = await itemModel.create(cat6);
//     let addedItem6 = await itemModel.create(cat7);
//     // console.log("Item created", addedItem1);
// })();

module.exports = itemModel;