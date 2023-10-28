const mongoose = require('mongoose');
const database_link="mongodb+srv://database_admin:LYTdPrD2KafHPy8d@cluster0.vsuxn2r.mongodb.net/?retryWrites=true&w=majority";
// const database_password=LYTdPrD2KafHPy8d;

// Connect to mongodb database
mongoose.connect(database_link)
.then(function(db){
    console.log('Inventory Database Successfully Connected');
})
.catch(function(err){
    console.log('Inventory Database Error',err);
})

const inventorySchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.ObjectId,
        ref: 'userModel',
        required: [true,"User Must Exist"]
    },
    name:{
        type: String,
        required: [true,"Product Name is Required"]
    },
    category:{
        type: String
    },
    currentQuantity:{
        type: Number
    },
    averageUsage:{
        type: Number
    },
    lastEntry:{
        type: Date
    },
    totalDays:{
        type: Number
    }
});

const inventoryModel = mongoose.model('inventoryModel',inventorySchema);
module.exports = inventoryModel;