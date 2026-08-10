const Tour = require('./../models/tourModel');
const factory  = require('./../controllers/handlerFactory');
const wishListedTours = [];
exports.getAllTours = factory.getAll(Tour);
exports.getTour = factory.getOne(Tour);
exports.updateTour = factory.updateOne(Tour);
exports.deleteTour = factory.deleteOne(Tour);
exports.createTour = factory.createOne(Tour);
