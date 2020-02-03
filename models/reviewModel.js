const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required: [true, 'Review can not by empty']
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Review must belong to a user.']
    },
    tour: {
        type: mongoose.Schema.ObjectId,
        ref: 'Tour',
        required: [true, 'Review must belong to a tour.']
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    }
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
