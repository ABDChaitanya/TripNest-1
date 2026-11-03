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
        const cacheKey = `tours:${JSON.stringify(req.query)}`;
        if (redis?.status === 'ready') {
            try {
                const cachedTours = await redis.get(cacheKey);
                if (cachedTours) {
                    const tours = JSON.parse(cachedTours);
                    return res.status(200).json({
                        status: 'success',
                        source: 'cache',
                        result: tours.length,
                        data: { tours }
                    });
                }
            } catch (cacheError) {
                console.warn('Redis cache read failed; using database:', cacheError.message);
            }
        }

        // Redis is only an optional cache; the database remains the source of truth.
        const features = new APIFeatures(Tour.find(), req.query)
        .filter()
        .sort()
        .search()
        .paginate()
        .limitFields();

        const tours = await features.query;
        if (redis?.status === 'ready') {
            redis.set(cacheKey, JSON.stringify(tours), 'EX', 3600).catch((cacheError) => {
                console.warn('Redis cache write failed:', cacheError.message);
            });
        }
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
