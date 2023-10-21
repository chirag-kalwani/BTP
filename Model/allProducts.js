const mongoose = require('mongoose');
const database_link="mongodb+srv://database_admin:ElDf7JgLLWdyHN8Q@cluster0.vsuxn2r.mongodb.net/?retryWrites=true&w=majority";
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
        type: Array
    },
});

const itemModel = mongoose.model('itemModel',itemSchema);

// Units Used
// Kilo-Gram -> Kilogram , Gram -> Gram , L -> Litre , ML -> MilliLitre , NO -> Number

// (async function addItem(){
//     const cat1 = {
//         category : "Grocery",
//         items : [{name : "Rice", unit: "Kilo-Gram"},
//                 {name : "Flour", unit: "Kilo-Gram"},
//                 {name : "Pulse", unit: "Kilo-Gram"},
//                 {name : "Almond", unit: "Gram"},
//                 {name : "Cashew", unit: "Gram"},
//                 {name : "Oil", unit: "Litre"},
//                 {name : "Masala", unit: "Gram"},
//                 {name : "Salt", unit: "Kilo-Gram"},
//                 {name : "Sugar", unit: "Kilo-Gram"},
//                 {name : "Tomato Sauce", unit: "Kilo-Gram"},
//                 {name : "Honey", unit: "Kilo-Gram"},
//                 {name : "Cereals", unit: "Kilo-Gram"},
//                 {name : "Tea", unit: "Kilo-Gram"},
//                 {name : "Coffee", unit: "Gram"}]
//     };

//     const cat2 = {
//         category : "Grooming Products",
//         items : [{name : "Shampoo", unit: "Milli-Litre"},
//                 {name : "Conditioner", unit: "Milli-Litre"},
//                 {name : "Soaps", unit: "Number"},
//                 {name : "Face Wash", unit: "Milli-Litre"},
//                 {name : "Perfume", unit: "Number"},
//                 {name : "Deodorant", unit: "Number"},
//                 {name : "Talcum Powder", unit: "Gram"},
//                 {name : "Hair Oil", unit: "Milli-Litre"},
//                 {name : "Body Lotion", unit: "Milli-Litre"}]
//     };

//     const cat3 = {
//         category : "Cleaning",
//         items : [{name : "Detergent Powder", unit: "Kilo-Gram"},
//                 {name : "Surface Cleaners", unit: "Milli-Litre"},
//                 {name : "Utensil Cleaners", unit: "Number"},
//                 {name : "Toilet Cleaners", unit: "Milli-Litre"},
//                 {name : "Handwash", unit: "Milli-Litre"}]
//     };

//     const cat4 = {
//         category : "Snacks/Instant-Foods",
//         items : [{name : "Chips", unit: "Number"},
//                 {name : "Kurkure", unit: "Number"},
//                 {name : "Bhujiya", unit: "Kilo-Gram"},
//                 {name : "Nachos", unit: "Number"},
//                 {name : "Makhana", unit: "Gram"},
//                 {name : "Soya Sticks", unit: "Number"},
//                 {name : "Popcorn", unit: "Number"},
//                 {name : "Cold Drink", unit: "Milli-Litre"},
//                 {name : "Juices", unit: "Milli-Litre"},
//                 {name : "Energy Drink", unit: "Milli-Litre"},
//                 {name : "Nutella", unit: "Gram"}]
//     };

//     const cat5 = {
//         category : "Vegetables",
//         items : [{name : "Onion", unit: "Kilo-Gram"},
//                 {name : "Potato", unit: "Kilo-Gram"},
//                 {name : "Tomato", unit: "Kilo-Gram"},
//                 {name : "Coriander", unit: "Gram"},
//                 {name : "Green Chilli", unit: "Gram"},
//                 {name : "Broccoli", unit: "Kilo-Gram"},
//                 {name : "Carrot", unit: "Kilo-Gram"},
//                 {name : "Cauliflower", unit: "Kilo-Gram"},
//                 {name : "Cabbage", unit: "Kilo-Gram"},
//                 {name : "Lady Finger", unit: "Kilo-Gram"},
//                 {name : "Capsicum", unit: "Kilo-Gram"},
//                 {name : "Peas", unit: "Kilo-Gram"},
//                 {name : "Spinach", unit: "Kilo-Gram"},
//                 {name : "Cucumber", unit: "Kilo-Gram"},
//                 {name : "Ginger", unit: "Gram"},
//                 {name : "Garlic", unit: "Gram"},
//                 {name : "Lemon", unit: "Number"}]
//     };

//     const cat6 = {
//         category : "Fruits",
//         items : [{name : "Coconut", unit: "Number"},
//                 {name : "Grapes", unit: "Kilo-Gram"},
//                 {name : "Orange", unit: "Kilo-Gram"},
//                 {name : "Banana", unit: "Kilo-Gram"},
//                 {name : "Watermelon", unit: "Kilo-Gram"},
//                 {name : "Mango", unit: "Kilo-Gram"},
//                 {name : "Apple", unit: "Kilo-Gram"},
//                 {name : "Pomegranate", unit: "Kilo-Gram"},
//                 {name : "Guava", unit: "Kilo-Gram"},
//                 {name : "Chikoo", unit: "Kilo-Gram"},
//                 {name : "Lichi", unit: "Kilo-Gram"},
//                 {name : "Papaya", unit: "Kilo-Gram"},
//                 {name : "Pineapple", unit: "Kilo-Gram"}]
//     };
//     const cat7 = {
//         category : "Dairy Products",
//         items : [
//                 {name : "Ghee", unit: "Kilo-Gram"},
//                 {name : "Milk", unit: "Litre"},
//                 {name : "Cheese", unit: "Gram"},
//                 {name : "Butter", unit: "Gram"},
//                 {name : "Panneer", unit: "Gram"},
//                 {name : "Choclate", unit: "Number"},
//                 {name : "Ice Cream", unit: "Gram"}]
//     };
//     let addedItem = await itemModel.create(cat3);
//     console.log("Item created", addedItem);
// })();
module.exports = itemModel;