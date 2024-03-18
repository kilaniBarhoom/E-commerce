import * as statusCodes from '../constants/status.constants.js';
import Product from '../models/product.js';
import Review from '../models/review.js';
import ResponseError from "../utils/responseerror.js";


// /api/reviews
export const getAllReviews = async (req, res, next) => {
    const reviews = await Review.find().populate('user', 'username email avatar').populate('product', 'name images')

    res.status(statusCodes.OK).json({
        reviews
    })
}


// /api/products/:productId/reviews ==> done
export const getReviewsOfAProduct = async (req, res, next) => {
    const { productId } = req.params;
    const reviews = await Review.find({ product: productId }).populate('user', 'username email avatar').populate('product', 'name images')

    res.status(statusCodes.OK).json({
        reviews
    })
}
// ==> done
export const createReview = async (req, res, next) => {
    const { productId } = req.params;
    const product = await Product.findById(productId)
    if (!product) {
        return next(
            new ResponseError(
                "Product not found",
                statusCodes.NOT_FOUND
            )
        )
    }
    const { rating, content } = req.body
    if (!rating || !content) {
        return next(
            new ResponseError(
                "Enter all required fields",
                statusCodes.BAD_REQUEST
            )
        )
    }
    const didRate = await Review.findOne({ user: req.user._id.toString(), product: productId })

    if (didRate) {
        return next(
            new ResponseError(
                "You have already reviewed this product",
                statusCodes.BAD_REQUEST
            )
        )
    }


    const review = await Review.create({
        rating,
        content,
        user: req.user._id,
        product: productId
    })
    // make the new review to have the user info
    await review.populate('user', 'username email avatar').execPopulate()

    res.status(statusCodes.CREATED).json({
        message: "Review added!",
        review
    })
}


// /api/reviews/:reviewId

export const updateReview = async (req, res, next) => {
    const { reviewId } = req.params
    const review = await Review.findById(reviewId)
    if (!review) {
        return next(
            new ResponseError(
                "Review not found",
                statusCodes.NOT_FOUND
            )
        )
    }
    if (req.user.role != 'admin' && review.user.toString() != req.user._id.toString()) {
        return next(
            new ResponseError(
                "You cannot update this review",
                statusCodes.BAD_REQUEST
            )
        )
    }
    const { rating, content } = req.body
    if (!rating || !content) {
        return next(
            new ResponseError(
                "Enter all required fields",
                statusCodes.BAD_REQUEST
            )
        )
    }
    const updatedReview = await Review.findByIdAndUpdate(reviewId, {
        rating,
        content
    }, {
        new: true,
        runValidators: true
    })

    res.status(statusCodes.OK).json({
        message: "Review updated",
        review: updatedReview
    })
}


export const deleteReview = async (req, res, next) => {
    const { reviewId } = req.params
    const review = await Review.findById(reviewId)
    if (!review) {
        return next(
            new ResponseError(
                "Review not found",
                statusCodes.NOT_FOUND
            )
        )
    }

    if (req.user.role != 'admin' && review.user.toString() != req.user._id.toString()) {
        return next(
            new ResponseError(
                "You cannot delete this review",
                statusCodes.BAD_REQUEST
            )
        )
    }
    await Review.findByIdAndDelete(reviewId)

    res.status(statusCodes.OK).json({
        message: "Review deleted"
    })

}