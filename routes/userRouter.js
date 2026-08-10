const authController = require('./../controllers/authController');
const userController = require('./../controllers/userController');
const express = require('express');
const router = express.Router();

router
 .post('/signup',authController.signup)
 .post('/login',authController.login)
 .post('/forgotpassword',authController.forgotPassword)
 .post('/resetPassword/:token',authController.resetPassword)
module.exports = router;

router
 .get('/getAll',userController.getAll)
 .get('/:id',userController.getUser)
 .delete('/delete/:id',userController.deleteUser)
 .patch('/update/:id',userController.updateUser)
 .post('/',userController.createUser)
 .post('/AddwishList/:id',authController.protect,userController.AddToWishList)
 .get('/wishList/:id',userController.getWishList)