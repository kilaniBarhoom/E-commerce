import * as statusCodes from '../constants/status.constants.js';
import Order from "../models/order.js";
import Product from "../models/product.js";
import ResponseError from "../utils/responseerror.js";

// /api/orders/admin
export const getAllOrders = async (req, res, next) => {
    const orders = await Order.find({})

    res.status(statusCodes.CREATED).json({
        orders
    })
}

// /api/orders/admin/:orderId
export const updateOrder = async (req, res, next) => {
    const { orderId } = req.params
    const { status } = req.body
    const order = await Order.findById(orderId)

    if (!order) {
        return next(
            new ResponseError(
                "Order not found",
                statusCodes.NOT_FOUND
            )
        )
    }

    if (order.orderStatus == 'Delivered') {
        return next(
            new ResponseError(
                "Order has already been delivered",
                statusCodes.BAD_REQUEST
            )
        )
    }

    order.orderItems.forEach(async item => {
        await updateStock(item.product, item.quantity)
    })

    if (!status) {
        return next(
            new ResponseError(
                "Provide the product status",
                statusCodes.BAD_REQUEST
            )
        )
    }
    order.orderStatus = req.body.status
    order.deliveredAt = Date.now()

    await order.save()

    res.status(statusCodes.CREATED).json({
        message: "Order updated"
    })
}
export const deleteOrder = async (req, res, next) => {
    const { orderId } = req.params
    const order = await Order.findById(orderId)

    if (!order) {
        return next(
            new ResponseError(
                "Order not found",
                statusCodes.NOT_FOUND
            )
        )
    }

    await Order.findByIdAndDelete(orderId)

    res.status(statusCodes.CREATED).json({
        message: "Order deleted"
    })
}

// /api/orders
export const createOrder = async (req, res, next) => {
    const { address, itemsPrice, shippingPrice, totalPrice, orderItems, paymentInfo } = req.body
    if (!address || !itemsPrice || !shippingPrice || !totalPrice || !orderItems || !paymentInfo) {
        return next(
            new ResponseError(
                "Enter all required fields",
                statusCodes.BAD_REQUEST
            )
        )
    }

    const order = await Order.create({
        address, itemsPrice,
        shippingPrice, totalPrice,
        orderItems, paymentInfo,
        paidAt: Date.now(), user: req.user._id
    })

    // loop over products and update stock and add the quantity purchased to the totlal number sold of a single product
    order.orderItems.forEach(async item => {
        await updateStock(item.product, item.quantity)
        await updateNumberOfSoldProductsOfASingleProduct(item.product, item.quantity)
    })

    res.status(statusCodes.CREATED).json({
        message: "Order placed",
        order
    })
}

// /api/orders/my
export const getMyOrders = async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id })

    res.status(statusCodes.CREATED).json({
        orders
    })
}

// /api/orders/:orderId
export const getOrder = async (req, res, next) => {
    const { orderId } = req.params
    const order = await Order.findById(orderId)
    if (!order) {
        return next(
            new ResponseError(
                "Order not found",
                statusCodes.NOT_FOUND
            )
        )
    }

    if (req.user.role != 'admin' && order.user != req.user._id) {
        return next(
            new ResponseError(
                "You cant view this order"
            )
        )
    }

    res.status(statusCodes.CREATED).json({
        order
    })
}


async function updateStock(id, quantity) {
    const product = await Product.findById(id)
    product.stock = product.stock - quantity
    await product.save()
}

async function updateNumberOfSoldProductsOfASingleProduct(id, quantity) {
    const product = await Product.findById(id)
    product.sold = product.sold + quantity
    await product.save()
}