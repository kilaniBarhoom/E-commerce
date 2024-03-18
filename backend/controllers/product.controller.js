import * as statusCodes from '../constants/status.constants.js';
import Product from "../models/product.js";
import APIFeatures from '../utils/apiFeatures.js';
import cloudinary from '../utils/cloudinary.js';
import ResponseError from "../utils/responseerror.js";

// /api/products
export const getProducts = async (req, res, next) => {

    const productsPerPage = req.query.productsPerPage;
    const totalPages = Math.ceil(await Product.countDocuments() / productsPerPage);
    const page = Math.ceil(req.query.page || 1);
    const apiFeatures = new APIFeatures(Product.find(), req.query)
        .search()
        .pagination(productsPerPage)
    const products = await apiFeatures.query.populate('user')
    res.status(statusCodes.OK).json({
        count: products.length,
        page,
        totalPages,
        products
    })
}

// /api/products/:productId
export const getProduct = async (req, res, next) => {
    const { productId } = req.params
    const product = await Product.findById(productId).populate('user')
    if (!product) {
        return next(
            new ResponseError(
                "Product not found",
                statusCodes.NOT_FOUND
            )
        )
    }
    res.status(statusCodes.OK).json({
        product
    })
}


export const createProduct = async (req, res, next) => {
    const { name, price, salePrice, tax, description, category, stock, quantity, status } = req.body;
    const { files } = req;

    if (!name || !price || !description || !category || !stock || !quantity || !status || !files) {
        return next(
            new ResponseError(
                "Please provide correct data for the product",
                statusCodes.BAD_REQUEST
            )
        );
    }

    let images = [];
    const uploadPromises = files.map(async file => {
        const { path } = file;
        const { secure_url, public_id } = await cloudinary.uploader.upload(path, {
            folder: process.env.CLOUDINARY_PRODUCTS_FOLDER
        });
        images.push({ url: secure_url, public_id });
    });

    await Promise.all(uploadPromises);

    // Create a new object with only the required fields
    const productData = {
        name,
        price,
        description,
        category,
        stock,
        quantity,
        status,
        user: req.user._id,
        images,
    };

    // Add optional fields if they are present in the request body
    if (tax) {
        productData.tax = tax;
    }

    if (salePrice) {
        productData.salePrice = salePrice;
    }

    const product = await Product.create(productData);
    res.status(statusCodes.OK).json({
        message: "Product successfully created",
        product
    });
};

// /api/products/:productId
export const updateProduct = async (req, res, next) => {
    const { productId } = req.params
    const { name, price, description, category, stock, status, quantity } = req.body;
    if (!name || !price || !description || !category || !stock || !status || !quantity) {
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


// /api/products/:productId/resolve
export const resolveProduct = async (req, res, next) => {
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
    // handle product already resolved
    if (product.status === "Active") {
        return next(
            new ResponseError(
                "Product already resolved",
                statusCodes.BAD_REQUEST
            )
        )
    }
    product.status = "Active";
    await product.save()
    res.status(statusCodes.OK).json({
        message: "Product resolved",
    })
}