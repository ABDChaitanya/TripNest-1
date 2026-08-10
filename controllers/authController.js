const User = require('./../models/userModel')
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
const path = require('path');
const sendEmail = require('./../utils/email');
const {promisify} =require('util');
const crypto = require('crypto')
dotenv.config({
    path: path.join(__dirname, './../config.env')
})
exports.protect = catchAsync(async (req, res, next) => {
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
        return next(new AppError('You are not logged in!!!', 400));
    }
    const token = req.headers.authorization.split(' ')[1];
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
      const freshUser = await User.findById(decoded.id);
    if (!freshUser) {
        return next(new AppError('The user no longer exists to the given token..', 401))
    }
    // //4)Check if user changed password after jwt is issued
    // if (freshUser.changedPasswordAfter(decoded.iat)) {
    //     return next(new AppError('User recently changed password! please log in again', 401));
    // }
    // //Grant acess  to protected route
    req.user = freshUser;
    next();
})
exports.signup = catchAsync(async (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        return next(new AppError('Please provide both email and password', 400));
    }

    const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    })
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
    res.status(200).json({
        status: 'success',
        token
    })

});
exports.login = catchAsync(async (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        return next(new AppError('Please provide email and password', 400));
    }
    const user = await User.findOne({ email: req.body.email }).select("+password");
    if (!user) {
        return next(new AppError('User not found', 400));
    }
    if (!user.correctPassword(req.body.password)) {
        return next(new AppError('Your password was incorrect', 400));
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
    res.status(200).json({
        status: 'success',
        token
    })

});
exports.forgotPassword = catchAsync(async (req, res, next) => {
    const email = req.body.email;
    if (!email) {
        return next(new AppError('Please provide email!', 400));
    }
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new AppError('There is no user on the given email', 400));
    }
    const token = user.createPasswordResetToken();
    user.save({
        validateBeforeSave: false
    });
    await sendEmail({
        email: email,
        text: `You are request that you forgot password this is the token for reset ${token}`
    });
    res.status(200).json({
        status: 'success'
    })
})
exports.resetPassword = catchAsync(async (req, res, next) => {
    const hashedToken = crypto
        .createHash('sha256')
        .update(req.params.token)
        .digest('hex');
    const user = await User.findOne({ passwordResetToken: hashedToken, passwordResetExpires: { $gt: Date.now() } });
    if (!user) {
        return next(new AppError('Token is invalid or expired', 400));
    }
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
    res.status(200).json({
        status: 'success',
        token
    })
})