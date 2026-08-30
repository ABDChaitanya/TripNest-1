const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const validator = require('validator');
const Tour = require('./tourModel');
const Review = require('./reviewModel');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A user must have a password'],
        trim: true
    },
    email: {
        type: String,
        required:[true,'A user must have a email'],
        lowercase:true,
        validate:[validator.isEmail,'Please provide a valid email'],
        unique: true
    },
    password: {
        type: String,
        required:[true,'A user must have a password'],
        minlength: 8,
        select:false
    },
    passwordConfirm: {
        type: String,
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'lead-guide','guide'],
        default: 'user'
    },
    passwordChangedAt: {
        type: Date,
        default: Date.now()
    },
    wishList:[{
        type:mongoose.Schema.ObjectId,
        ref:'Tour'
    }],
    passwordResetToken: String,
    passwordResetExpires: Date

})
userSchema.pre('save', async function () {
    //Only run this function if password was actually modified
    if (!this.isModified('password')) return;

    //hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);

    //Delete 
    this.passwordConfirm = undefined;
});
userSchema.pre('save',function(){
    if(!this.isModified('password')|| this.isNew)return;
     this.passwordChangedAt = Date.now()-1000;
});
userSchema.methods.correctPassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
}
userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    return resetToken;
}
const User = mongoose.model('User', userSchema);
module.exports = User;
