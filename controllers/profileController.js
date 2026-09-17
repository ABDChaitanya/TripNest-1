const Tour = require('../models/tourModel');
const Review = require('./../models/reviewModel');
const Booking = require('./../models/bookingModel');
const mongoose = require('mongoose');
exports.profile_stats = async(req,res)=>{
    const id = String(req.params.id);
    const reviews = await Review.countDocuments({
        user:new mongoose.Types.ObjectId(req.params.id)
    });
    const tours = await Booking.countDocuments({
        user:new mongoose.Types.ObjectId(req.params.id)
    });
    const allReviews = await Review.find({
        user:new mongoose.Types.ObjectId(req.params.id)
    }).populate({
            path:'tour',
            select:'name'
        });
    const result =  await Booking.aggregate([
        {
            $match:{
                user:new mongoose.Types.ObjectId(req.params.id),
                status:{$in:["paid"]}
            }
        },
        {
            $group:{
                _id:null,
                totalSpent:{$sum:"$price"}
            }
        }
    ]);
    const bookings = await Booking.find({
        user:new mongoose.Types.ObjectId(req.params.id)
    })
    const TotalSpent = result[0]?.totalSpent||0;
    res.status(200).json({
        status:"success",
        reviews,
        tours,
        TotalSpent,
        bookings,
        allReviews
    })
}