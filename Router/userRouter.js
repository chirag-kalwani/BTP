const express = require('express');
const {signup,login,isLoggedIn,protectRoute} = require('../Controller/authController');

const userRouter=express.Router();

// Check if user is logged in
userRouter.route('/')
.get(protectRoute,isLoggedIn);

// User SignUp
userRouter.route('/signup')
.post(signup);

// User Login
userRouter.route('/login')
.post(login);

// // Logout User
// userRouter.route('/logout')
// .get(logout);

module.exports = userRouter;