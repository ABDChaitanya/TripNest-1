const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const APIFeatures = require('./../utils/apiFeatures');
exports.getAll = Model => catchAsync(async (req, res, next) => {
    let filter = {};
    if (req.params.tourId) {
        filter = { tour: req.params.tourId };
    }
    console.log(req.query);
    const features = new APIFeatures(Model.find(filter), req.query)
        .filter()
        .sort()
        .search()
        .paginate()
        .limitFields()

    const docs = await features.query;
    res.status(200).json({
        status: 'success',
        result: docs.length,
        data: {
            docs
        }
    })
});
exports.updateOne = Model => catchAsync(async (req, res, next) => {
    const docs = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        ValidateBeforeSave: true
    });
    if (!docs) {
        return next(new AppError('There is no docs on that ID', 401));
    }

    res.status(200).json({
        status: 'success',
        docs
    });
});
exports.deleteOne = Model => catchAsync(async (req, res, next) => {
    const docs = await Model.findByIdAndDelete(req.params.id);
    if (!docs) {
        return next(new AppError('There is no docs on the given ID', 401));
    }
    res.status(200).json({
        status: 'success',
        data: null
    });
});
exports.createOne = Model => catchAsync(async (req, res, next) => {
    const docs = await Model.create(req.body);
    res.status(200).json({
        status: 'success',
        data: docs

    })
});
exports.getOne = (Model, popOptions) => catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) {
        query = query.populate(popOptions);
    }
    const doc = await query;
    if (!doc) {
        return next(new AppError('No document found with that ID', 404));
    }
    res.status(200).json({
        status: 'success',
        data: doc
    })
});
exports.wishList = Model => catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.user.id, {
        $addToSet: {
            wishList: req.params.id
        }
    },
        {
            new: true,
            runValidators:true
        });
    if (!doc) {
        return next(new AppError('There is no Document on the given ID', 401));
    }
    res.status(200).json({
        status: 'success',
        doc
    })
});
exports.getWishList = (Model, popOptions) => catchAsync(async (req, res, next) => {
      let query = Model.findById(req.params.id);
    if (popOptions) {
        query = query.populate({ path: popOptions });
    }
    const doc = await query;
    res.status(200).json({
        status: 'success',
        wishList: doc.wishList
    });
});