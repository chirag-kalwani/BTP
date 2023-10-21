const mongoose = require('mongoose');
const emailValidator = require("email-validator");  // For Validating Email

const database_link="mongodb+srv://database_admin:ElDf7JgLLWdyHN8Q@cluster0.vsuxn2r.mongodb.net/?retryWrites=true&w=majority";
// const database_password=ElDf7JgLLWdyHN8Q;


// Connect to mongodb database
mongoose.connect(database_link)
    .then(function(db){
        console.log('User Database Successfully Connected');
    })
    .catch(function(err){
        console.log('User Database Connection Error: ',err);
    })


const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        validate: [function(){
            return emailValidator.validate(this.email);
        },"Email is Not Valid"]
    },
    password:{
        type: String,
        required: true,
        minLength: [8 , "Password Length Must be Greater than or equal to 8"]
    },
    confirmPassword:{
        type: String,
        validate: [function(){
            return this.confirmPassword==this.password;
        }, "Confirm Password Does Not Match The Original Password" ]
    },
    resetToken:String
});

userSchema.pre('save',function(){
    this.confirmPassword=undefined;
});


const userModel = mongoose.model('userModel', userSchema);
module.exports = userModel;
