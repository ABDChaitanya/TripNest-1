const Review = require('./../models/reviewModel');
const factory = require('./handlerFactory');
exports.getReview = factory.getOne(Review,'tour');
exports.getAll = factory.getAll(Review);
exports.createReview = factory.createOne(Review);
exports.deleteReview = factory.deleteOne(Review);
exports.updateReview = factory.updateOne(Review);
 