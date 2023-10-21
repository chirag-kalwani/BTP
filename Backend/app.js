const express=require('express');
const userRouter=require('./Router/userRouter');
const productRouter=require('./Router/productRouter');
const itemModel = require('./Model/allProducts');
const cors = require('cors');

const app=express();
app.listen(8000);
app.use(cors());
app.use(express.json());

// EndPoint for all the user functions i.e login, signup, forgetPassword, isloggedIn
app.use('/user',userRouter);

// EndPoint for managing products in inventory for particular user
app.use('/product',productRouter);

// Endpoint to get all the products in Database
app.get('/getAllItems',async (req,res)=>{
    let items = await itemModel.find();
    return res.json({
        "Message" : "All Items",
        Items: items
    });
})