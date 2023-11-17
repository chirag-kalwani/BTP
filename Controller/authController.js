const userModel = require('../Model/userModel');
const jwt = require('jsonwebtoken');
const JWT_key = require('../secrets.js');

module.exports.signup = async function signup(req,res){
    try{
        let userData=req.body;
        const createdUser= await userModel.create(userData);

        if(createdUser){
            return res.json({
                Message:"USER SIGNED UP",
                Data:createdUser
            });
        }
        else{
            return res.status(500).json({
                Message:"ERROR WHILE SIGNING UP"
            });
        }
    }
    catch(err){
        return res.status(500).json({
            "Error": err.message,
            "Location": "authController"
        });
    }
}

module.exports.login = async function login(req,res){
    try{
        const userData=req.body;

        if(userData.email && userData.password){
            const foundUser = await userModel.findOne({email:userData.email});
        
            if(foundUser){
                if(foundUser.password==userData.password){
                    let uid = foundUser['_id'];      // JWT uid
                    let jwt_token = jwt.sign({payload:uid},JWT_key);
                    return res.json({
                        Message:'User Logged In',
                        "User" : {
                            "name":foundUser.name,
                            "email":foundUser.email
                        },
                        authToken: jwt_token
                    });
                }
                else{
                    // Password is wrong
                    return res.status(500).json({
                        Message:"Wrong Password"
                    });
                }

            }
            else{
                // User Details not found in the database
                return res.status(500).json({
                    Message:"User Not Found"
                });
            }
        }
        else{
            // Email or password field not found
            return res.status(500).json({
                Message:"Empty Fields Found"
            });
        }
    }
    catch(err){
        return res.status(500).json({
            "Error": err.message,
            "Location": "authController"
        });
    }
}

module.exports.updateUser = async function updateUser(req, res){
    let type = req.body.type;

    if(type == 1){
        if(req.body.name){
            const newName = req.body.name;
            const userData = await userModel.findById(req.body.user);

            userData.name = newName;

            await userData.save();

            return res.json({
                Message: "Name Changed Successfully",
                name: newName
            });
        }
        else{
            return res.status(400).json({
                Message: "Name Missing"
            });
        }
    }
    else if(type == 2){
        if(req.body.password){
            const oldPassword = req.body.password;
            const userData = await userModel.findById(req.body.user);

            if(userData.password == oldPassword){
                return res.json({
                    Message: "Password Matched Successfully"
                });
            }
            else{
                return res.status(400).json({
                    Message: "OLD Password Not Matched"
                });
            }
        }
        else{
            return res.status(400).json({
                Message: "Password Missing"
            });
        }
    }
    else if(type == 3){
        if(req.body.oldPassword && req.body.newPassword){
            const oldPassword = req.body.oldPassword;
            const newPassword = req.body.newPassword;

            const userData = await userModel.findById(req.body.user);

            if(userData.password == oldPassword){
                userData.password = newPassword;

                try{
                    await userData.save();
                    return res.json({
                        Message: "Password Changed Successfully"
                    });
                }
                catch(err){
                    return res.status(400).json({
                        Message: err.message
                    });
                }
            }
            else{
                return res.status(400).json({
                    Message: "OLD Password Not Matched"
                });
            }
        }
        else{
            return res.status(400).json({
                Message: "Password Missing"
            });
        }
    }
    else{
        return res.status(500).json({
            Message: "Incorrect Choice"
        });
    }
}

// Function to check if the user is logged in
module.exports.isLoggedIn = async function isLoggedIn(req,res){
    try{
        let userData = await userModel.findById(req.body.user);
        if(userData){
            return res.json({
                "Message" : "User Is Logged In",
                "authToken" : req.body.authToken,
                "User" : {
                    "name":userData.name,
                    "email":userData.email
                }
            });
        }
        else{
            return res.status(500).json({
                Message:"User Does Not Exists"
            });
        }
    }
    catch(err){
        return res.status(500).json({
            Message: err.message,
            Location: "authController"
        });
    }
}

// Middle Ware To Verify authToken
module.exports.protectRoute = async function protectRoute(req,res,next){
    try{
        let token=req.headers.authtoken;
        if(token){  
            let payload=jwt.verify(token,JWT_key);
            const user = await userModel.findById(payload.payload);

            if(user){
                req.body.user= user.id;
                next();
            }
            else{
                return res.status(500).json({
                    Message:"User Does Not Exists"
                });
            }
        }
        else{
            // No authtoken found in request header
            return res.status(500).json({
                Message:"Missing auth Token"
            });
        }
    }
    catch(err){
        return res.status(500).json({
            Message: err.message,
            Location: "authController"
        });
    }
}
