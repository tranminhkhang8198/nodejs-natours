const Review = require('./../models/reviewModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const filterObj = require('./../utils/filterObject');

exports.createReview = catchAsync(async (req, res, next) => {
    // Allow nested routes
    if (!req.body.tour) req.body.tour = req.params.tourId;
    if (!req.body.user) req.body.user = req.user.id;

    // Filtered out unwanted fields names that are not allowed to be updated
    const filteredBody = filterObj(req.body, 'review', 'rating', 'user', 'tour');

    // Create review document
    const newReview = await Review.create(filteredBody);

    res.status(201).json({
        status: 'success',
        data: {
            review: newReview
        }
    });
});

exports.getAllReviews = catchAsync(async (req, res, next) => {
    // EXECUTE QUERY
    const features = new APIFeatures(Review.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
    const reviews = await features.query;

    // SEND RESPONSE
    res.status(200).json({
        status: 'success',
        results: reviews.length,
        data: {
            reviews
        }
    });
});
