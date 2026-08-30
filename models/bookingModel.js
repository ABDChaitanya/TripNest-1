const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'A booking order should have user']
    },
    tour: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tour',
        required: [true, 'A booking order should have a tour']
    },
    price: {
        type: Number,
         required: [true, 'A booking should have a price']
    },
    guests: {
        type: Number,
          required: [true, 'A booking should have at least one guest'],
        min: 1,
        max: 12
    },
    status: {
        type: String,
        enum: ['pending', 'paid'],
        default: 'pending'
    },
    bookingDate: {
        type: Date,
        default: Date.now
    }
},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    });
bookingSchema.pre(/^find/, function () {
    this.populate({
        path: 'user',
        select: 'name photo'
    })
});
bookingSchema.pre(/^find/,function(){
    this.populate({
        path:'tour',
        select:'name difficulty -reviews'
    })
})
const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;