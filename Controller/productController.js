const productModel = require('../Model/userProducts');
const inventoryModel = require('../Model/InventoryModel');
const itemModel = require('../Model/allProducts');

const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

// Function for taking user entry
module.exports.createProduct = async function createProduct(req,res){
    let productDetails = req.body;

    const d = new Date();
    let name=productDetails.name;
    let date=d.getDate();
    let year=d.getFullYear();
    let month=months[d.getMonth()];
    // let month="March";

    try{
        // Checking for an existing entry for the current month
        let product = await productModel.findOne({user:productDetails.user, name:name, year:year, month:month});
        let inventoryDetails = await inventoryModel.findOne({user:productDetails.user, name:name});

        // Updating the information of current product in inventory database
        if(inventoryDetails){
            if(productDetails.remainingQuantity >=0){
                inventoryDetails.currentQuantity = productDetails.remainingQuantity + productDetails.newQuantity;
            }
            else{
                inventoryDetails.currentQuantity += productDetails.newQuantity;
            }
            inventoryDetails = await inventoryDetails.save();
        }
        else{
            inventoryDetails ={"user":productDetails.user, "name":productDetails.name, "category":productDetails.category};
            if(productDetails.remainingQuantity >=0){
                inventoryDetails.currentQuantity = productDetails.remainingQuantity + productDetails.newQuantity;
            }
            else{
                inventoryDetails.currentQuantity = productDetails.newQuantity;
            }
            inventoryDetails = await inventoryModel.create(inventoryDetails);
        }
        
        if(product){
            product.date = date;
            product.brand = productDetails.brand;
            product.newQuantity = productDetails.newQuantity;
            product.price += productDetails.price;
            product.totalQuantity += productDetails.newQuantity;
            
            product = await product.save();

            return res.json({
                Message: "Product Saved Successfully",
                Product : product,
                Inventory : inventoryDetails
            });
        }
        else{
            productDetails.date=date;
            productDetails.month=month;
            productDetails.year=year;
            productDetails.totalQuantity = productDetails.newQuantity;

            const createdProduct = await productModel.create(productDetails);
            
            if(createdProduct){
                return res.json({
                    Message:"Product Created Successfully",
                    Product: createdProduct,
                    inventoryDetails : inventoryDetails
                });
            }
            else{
                return res.status(500).json({
                    Message:"Product Details could not Saved"
                });
            }
        }
    }
    catch(err){
        return res.status(500).json({
            Error: err.message,
            Message: "Product Controller"
        });
    }
};

module.exports.getInventory = async function getInventory(req,res){
    let user = req.body.user;
    const d = new Date();
    let year=d.getFullYear();
    let month=months[d.getMonth()];
    // let month="March";

    try{
        let inventoryDetails = await inventoryModel.find({user:user});
        let allitems = await itemModel.find();
        let finalInventory =[];
        
        for(let x=0;x<inventoryDetails.length;x++){
            let product = await productModel.findOne({user:user, name:inventoryDetails[x].name , month:month, year:year});
            let productDetails = {};
            productDetails.price=0;
            if(product){
                productDetails.price = product.price;
            }
            
            // Adding Respective units in the object
            for(y=0;y<allitems.length;y++){
                if(allitems[y].category==inventoryDetails[x].category){
                    for(z=0;z<allitems[y].items.length;z++){
                        if(allitems[y].items[z].name == inventoryDetails[x].name){
                            productDetails.unit = allitems[y].items[z].unit;
                            break;
                        }
                    }
                    break;
                }
            }

            productDetails.name = inventoryDetails[x].name;
            productDetails.category = inventoryDetails[x].category;
            productDetails.avg_usage = 1;
            productDetails.curr_quantity = inventoryDetails[x].currentQuantity;
            finalInventory.push(productDetails);
        }

        return res.json({
            "Message" : "Inventory Detais",
            Inventory : finalInventory
        });
    }
    catch(err){
        return res.status(500).json({
            "Error" : err.message,
            "Location" : "Product Controller"
        });
    }
}

module.exports.updateProduct = async function getInventory(req,res){
    let name = req.body.name;
    let currQuantity=req.body.currentQuantity;
    let user = req.body.user;
    try{
        let inventoryDetails = await inventoryModel.findOne({user:user,name:name});

        if(inventoryDetails){
            inventoryDetails.currentQuantity = currQuantity;
            inventoryDetails=await inventoryDetails.save();

            return res.json({
                Message: "Inventory Updated Successfully",
                Data : inventoryDetails
            });
        }
        else{
            return res.status(500).json({
                "Error" : "Inventory Details Not Found"
            });
        }

    }
    catch(err){
        return res.status(500).json({
            Error: err.message,
            Message: "Product Controller"
        });
    }
}

module.exports.graphData = async function graphData(req,res){
    const d = new Date();
    let year=d.getFullYear();
    let month=d.getMonth();

    try{
        let user=req.body.user;
        let name=req.body.name;

        if(name){
            let graphData =[];
            for await (const x of [0,1,2,3,4,5]) {
                
                let data = await productModel.findOne({"user":user , "name":name , "month":months[month] , "year":year});
                let tempData = {"name": name , "month" : months[month] , "year":year , "price":0 , "totalQuantity":0};
                
                if(data){
                    tempData.price = data.price;
                    tempData.totalQuantity = data.totalQuantity;
                }

                graphData.push(await tempData);
                month--;
                if(month<0){
                    month=11;
                    year--;
                }
            }
            
            return res.json({
                Message : "Bar Graph Data",
                data : graphData
            });
        }
        else{
            return res.status(500).json({
                Error: "Product Name Not Found"
            });
        }

    }
    catch(err){
        return res.status(500).json({
            Error: err.message,
            Message: "Product Controller"
        });
    }
}