import Product from "../models/product.js";
import * as statusCodes from '../constants/status.constants.js'
import ResponseError from "../utils/responseerror.js";
import cloudinary from '../utils/cloudinary.js'
import APIFeatures from '../utils/apiFeatures.js'

// /api/products
export const getProducts = async (req, res, next) => {

    const resPerPage = 8
    const apiFeatures = new APIFeatures(Product.find(), req.query)
        .search()
        .pagination(resPerPage)
    const products = await apiFeatures.query.populate('user')
    res.status(statusCodes.OK).json({
        count: products.length,
        products
    })

}
export const createProduct = async (req, res, next) => {
    const { name, price, description, category, seller, stock } = req.body;
    const { files } = req
    if (!name || !price || !description || !category || !seller || !stock || !files) {
        return next(
            new ResponseError(
                "Please provide correct data for the product",
                statusCodes.BAD_REQUEST
            )
        )
    }

    let images = []
    const uploadPromises = files.map(async file => {
        const { path } = file
        const { secure_url, public_id } = await cloudinary.uploader.upload(path, {
            folder: process.env.CLOUDINARY_PRODUCTS_FOLDER
        });
        images.push({ url: secure_url, public_id });
    })

    await Promise.all(uploadPromises)

    req.body.user = req.user._id
    req.body.images = images
    const productData = req.body

    const product = await Product.create(productData)
    res.status(statusCodes.OK).json({
        message: "Product successfully created",
        product
    })

}

// /api/products/:productId
export const updateProduct = async (req, res, next) => {
    const { productId } = req.params
    const { name, price, description, images, category, seller, stock } = req.body;
    if (!name || !price || !description || !images || !category || !seller || !stock) {
        return next(
            new ResponseError(
                "Please provide correct data for the product",
                statusCodes.BAD_REQUEST
            )
        )
    }
    const product = await Product.findById(productId)
    if (!product) {
        return next(
            new ResponseError(
                "Product not found",
                statusCodes.NOT_FOUND
            )
        )
    }

    await Product.findByIdAndUpdate(productId, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(statusCodes.OK).json({
        message: "Product updated",
    })

}
export const deleteProduct = async (req, res, next) => {
    const { productId } = req.params

    const product = await Product.findById(productId)
    if (!product) {
        return next(
            new ResponseError(
                "Product not found",
                statusCodes.NOT_FOUND
            )
        )
    }

    await Product.findByIdAndDelete(productId)

    res.status(statusCodes.OK).json({
        message: "Product deleted",
    })

}

// /api/products/:productId/reviews
export const getAllReviews = async (req, res, next) => {
    const { productId } = req.params;
    const product = await Product.findById(productId).populate('reviews.user', 'username avatar')
    if (!product) {
        return next(
            new ResponseError(
                "Product not found",
                statusCodes.NOT_FOUND
            )
        )
    }

    const reviews = product.reviews

    res.status(statusCodes.OK).json({
        reviews
    })
}
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
    const { rating, body } = req.body
    if (!rating || !body) {
        return next(
            new ResponseError(
                "Enter all required fields",
                statusCodes.BAD_REQUEST
            )
        )
    }
    const didRate = product.reviews.find(review => {
        return review.user.toString() == req.user._id.toString()
    })
    if (didRate) {
        didRate.body = body;
        didRate.rating = rating;
    } else {
        const review = {
            rating,
            body,
            user: req.user._id
        }
        product.reviews.push(review)
    }


    await product.save()

    res.status(statusCodes.CREATED).json({
        message: "Review added"
    })
}


// /api/products/:productId/reviews/:reviewId
export const deleteReview = async (req, res, next) => {
    const { productId, reviewId } = req.params
    const product = await Product.findById(productId)
    if (!product) {
        return next(
            new ResponseError(
                "Product not found",
                statusCodes.NOT_FOUND
            )
        )
    }

    const review = product.reviews.find(review => review._id == reviewId)
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
    product.reviews.pull(review._id)
    await product.save()
    res.status(statusCodes.OK).json({
        message: "Review deleted"
    })

}