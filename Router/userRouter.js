const express = require('express');
const {signup, login, updateUser, isLoggedIn, protectRoute} = require('../Controller/authController');

const userRouter=express.Router();

// Check if user is logged in
userRouter.route('/')
.get(protectRoute, isLoggedIn)
.patch(protectRoute, updateUser);

// User SignUp
userRouter.route('/signup')
.post(signup);

// User Login
userRouter.route('/login')
.post(login);

module.exports = userRouter;