const mongoose = require('mongoose');
const Review = require('./reviewModel');
const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A tour must have a name'],
        unique: true
    },
    ratingsAverage: {
        type: Number,
        min: 1,
        max: 5
    },
    duration: {
        type: Number,
        required: [true, 'A tour must have a duration']
    },
    difficulty: {
        type: String,
        enum: ['easy', 'medium', 'difficult'],
        default: 'medium',
        required: [true, 'A tour must have a difficulty']
    },
    price: {
        type: Number,
        required: [true, 'A tour must have a price']
    },
    description:String,
    summary:String,
    startLocation: {
        type: {
            type:String,
            default: 'Point',
            enum: ['Point']
        },
        coordinates:[Number],
        address:String,
        description:String
    },
    imageCover:{
        type:String
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});
tourSchema.index({
    startLocation:'2dsphere'
})
tourSchema.virtual('reviews', {
    ref: 'Review',
    foreignField: 'tour',
    localField: '_id'
});
tourSchema.pre(/^find/, function () {
    this.populate('reviews');
});
// tourSchema.pre('save',function(){

// })
const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;