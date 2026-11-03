const Tour = require('./../models/tourModel');
const factory  = require('./../controllers/handlerFactory');
const redis = require('./../utils/redis');
const APIFeatures = require('./../utils/apiFeatures');
const wishListedTours = [];
//exports.getAllTours = factory.getAll(Tour);
exports.getTour = factory.getOne(Tour);
exports.updateTour = factory.updateOne(Tour);
exports.deleteTour = factory.deleteOne(Tour);
exports.createTour = factory.createOne(Tour);

exports.getAllTours = async(req,res,next)=>{
    try{
        /// Retrieve tours from Redis cache
        const features = new APIFeatures(Tour.find(), req.query)
        .filter()
        .sort()
        .search()
        .paginate()
        .limitFields();

        const tours = await features.query;
        const cacheKey = `tours:${JSON.stringify(req.query)}`;
        const cachedTours = await redis.get(cacheKey);
        if(cachedTours){
            return res.status(200).json({
                status:'success',
                source:'cache',
                result:JSON.parse(cachedTours).length,
                data:{
                    tours:JSON.parse(cachedTours)
                }
            })
        }
        await redis.set(cacheKey,JSON.stringify(tours),'EX',3600);
        res.status(200).json({
            status:'success',
            source:'database',
            result:tours.length,
            data:{
                tours
            }
        })
    }catch(err){
        next(err);
    }
}