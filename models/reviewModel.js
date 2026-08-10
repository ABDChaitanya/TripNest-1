const mongoose = require('mongoose');

const User = require('./userModel');
const reviewSchema = new mongoose.Schema({
    review:{
        type:String,
        required:[true,'Review cannot be empty']
    },
    rating:{
        type:Number,
        min:1,
        max:5
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        select:false
    },
    tour:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Tour',
        required:[true,'Review must belong to a tour']
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:[true,'Review must belong to a user']
    }
},
{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
}
);
reviewSchema.pre(/^find/,function(){
    this.populate({
        path:'user',
        select:'name photo'
    })
});
reviewSchema.post('save',async function(){
    const Tour = mongoose.model('Tour');
    const stats = await this.constructor.aggregate([
        {
            $match:{tour:this.tour}
        },
        {
            $group:{
                _id:'$tour',
                nRating:{$sum:1},
                nAverage:{$avg:'$rating'}
            }
        }
    ]);
    await Tour.findByIdAndUpdate(this.tour,{
        ratingsAverage:stats[0].nAverage
    })
})
const Review = mongoose.model('Review',reviewSchema);
module.exports = Review;