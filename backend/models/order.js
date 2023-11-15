import { Schema, model } from 'mongoose'

const orderSchema = new Schema({

    address: {
        country: {
            type: String,
            required: [true, 'Country must be provided']
        },
        city: {
            type: String,
            required: [true, 'City must be provided']
        },
        streetname: {
            type: String,
            required: [true, 'Street name must be provided']
        },
        postalcode: {
            type: String,
            required: [true, "Postal code must be provided"]
        }
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Order\'s user must be provided']
    },
    orderItems: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            }
        }
    ],
    paymentInfo: {
        id: String,
        status: String
    },
    paidAt: {
        type: Date,
        required: true
    },
    itemsPrice: {
        type: Number,
        required: true,
        default: 0.00
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0.00
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.00
    },
    orderStatus: {
        type: String,
        default: "Processing"
    },
    deliveredAt: {
        type: Date
    }
},
    {
        timestamps: true
    }
)




const Order = model('Order', orderSchema)
export default Order