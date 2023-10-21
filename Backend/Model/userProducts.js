const mongoose = require('mongoose');
const database_link="mongodb+srv://database_admin:ElDf7JgLLWdyHN8Q@cluster0.vsuxn2r.mongodb.net/?retryWrites=true&w=majority";
// const database_password=ElDf7JgLLWdyHN8Q;

// Connect to mongodb database
mongoose.connect(database_link)
    .then(function(db){
        console.log('User Products Database Successfully Connected');
    })
    .catch(function(err){
        console.log('User Products Database Error',err);
    })

const productSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.ObjectId,
        ref: 'userModel',
        required: [true,"User Must Exist"]
    },
    year:{
        type:Number
    },
    month:{
        type:String
    },
    date:{
        type:Number
    },
    name:{
        type: String,
        required: [true,"Product Name is Required"]
    },
    category:{
        type: String,
        required: [true,"Category is Required"]
    },
    unit:{
        type: String
    },
    brand:{
        type: String
    },
    price:{
        type: Number,
        required: true
    },
    totalQuantity:{
        type: Number
    },
    newQuantity:{
        type: Number,
        required: true
    }
});


// Adds User's Name with the data
productSchema.pre(/^find/, function(next){
    this.populate({
        path: "user",
        select: "name"
    });
    next();
});

const productModel = mongoose.model('productModel',productSchema);
module.exports = productModel;