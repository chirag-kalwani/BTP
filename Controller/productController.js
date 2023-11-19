const productModel = require('../Model/userProducts');
const inventoryModel = require('../Model/InventoryModel');
const itemModel = require('../Model/itemModel');

const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

// Function for taking user entry of a product.
module.exports.createProduct = async function createProduct(req,res){
    let productDetails = req.body;
    let name=productDetails.name;
    let category = productDetails.category;
    let brand = productDetails.brand;

    const d = new Date();
    const date=d.getDate();
    const year=d.getFullYear();
    const month=months[d.getMonth()];

    try{
        // Checking for an existing entry for the current month
        let product = await productModel.findOne({user:productDetails.user, name:name, year:year, month:month});
        let inventoryDetails = await inventoryModel.findOne({user:productDetails.user, name:name});
        let itemDetails = await itemModel.findOne({category: category});

        if(brand != ""){
            let newItem = itemDetails.items.get(name);
            if(!newItem.topBrands){
                newItem.topBrands = {};
            }
            if(!newItem.topBrands.get(brand)){
                newItem.topBrands.set(brand, 0);
            }
            newItem.topBrands.set(brand, newItem.topBrands.get(brand)+1);
            itemDetails.items.set(name, newItem);
        }

        // Updating the information of current product in inventory database
        if(inventoryDetails){
            if(productDetails.remainingQuantity >=0){
                inventoryDetails.currentQuantity = productDetails.remainingQuantity + productDetails.newQuantity;
            }
            else{
                inventoryDetails.currentQuantity += productDetails.newQuantity;
            }
            
            if(brand!="" && inventoryDetails.brand!=""){
                let prevBrand = itemDetails.items.get(name).topBrands.get(inventoryDetails.brand);
                itemDetails.items.get(name).topBrands.set(inventoryDetails.brand, prevBrand - 1);
            }
            
            inventoryDetails.lastEntry = d;
            inventoryDetails.brand = brand;
            inventoryDetails = await inventoryDetails.save();
        }
        else{
            inventoryDetails = {
                user: productDetails.user,
                name: productDetails.name,
                category: productDetails.category,
                brand: productDetails.brand,
                averageUsage: 1,
                totalDays: 1,
                lastEntry: d,
            };

            if(productDetails.remainingQuantity >=0){
                inventoryDetails.currentQuantity = productDetails.remainingQuantity + productDetails.newQuantity;
            }
            else{
                inventoryDetails.currentQuantity = productDetails.newQuantity;
            }

            inventoryDetails = await inventoryModel.create(inventoryDetails);
        }

        await itemDetails.save();
        
        if(product){
            product.date = date;
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

            productDetails.brand = productDetails.newQuantity = undefined;

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
    const user = req.body.user;
    const d = new Date();
    const year=d.getFullYear();
    const month=months[d.getMonth()];

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
                    productDetails.unit = allitems[y].items.get(inventoryDetails[x].name).unit;
                    productDetails.topBrands = allitems[y].items.get(inventoryDetails[x].name).topBrands;

                    let tempBrands = [];
                    if(productDetails.topBrands){
                        for (const [key, value] of productDetails.topBrands.entries()) {
                            tempBrands.push({key, value});
                        }
                    }

                    tempBrands = tempBrands.sort((a, b) => {
                        return b.value - a.value;
                    });

                    tempBrands = tempBrands.filter((element, index) => {return element.value>0 && index<3;});
                    productDetails.topBrands = tempBrands;
                }
            }
            
            if(!productDetails.topBrands){
                productDetails.topBrands = {};
            }
            productDetails.name = inventoryDetails[x].name;
            productDetails.category = inventoryDetails[x].category;
            productDetails.avg_usage = inventoryDetails[x].averageUsage;
            productDetails.curr_quantity = inventoryDetails[x].currentQuantity;

            productDetails.days_left = Math.floor(((inventoryDetails[x].currentQuantity - inventoryDetails[x].averageUsage * (Math.floor((d - inventoryDetails[x].lastEntry)/(1000*24*3600)))))/inventoryDetails[x].averageUsage);
            productDetails.days_left = Math.max(0, productDetails.days_left);
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

// Function to update product details in Inventory of an User.
module.exports.updateProduct = async function getInventory(req,res){
    let name = req.body.name;
    let currQuantity=req.body.currentQuantity;
    let user = req.body.user;

    const d = new Date();

    try{
        let inventoryDetails = await inventoryModel.findOne({user:user, name:name});

        if(inventoryDetails){

            // Updating Average Usage
            if(currQuantity > 0){
                let totalUsage = (inventoryDetails.averageUsage * inventoryDetails.totalDays + (inventoryDetails.currentQuantity - currQuantity));
                inventoryDetails.totalDays += Math.floor((d - inventoryDetails.lastEntry)/(1000*24*3600));
                inventoryDetails.lastEntry = d;
                
                inventoryDetails.averageUsage = totalUsage/inventoryDetails.totalDays;
            }

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