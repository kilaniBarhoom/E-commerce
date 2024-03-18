import { Schema, model } from 'mongoose'
import cloudinary from '../utils/cloudinary.js'
import Review from './review.js'

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Product must have a name'],
        trim: true,
        max: [100, 'Product name cannot be longer than 100 characters!']
    },
    price: {
        type: Number,
        required: [true, 'Product must have a price'],
        min: [0, 'Product price cannot be negative!'],
        default: 0.00
    },
    salePrice: {
        type: Number,
        required: false,
        min: [0, 'Product price cannot be negative!'],
        default: 0.00
    },
    tax: {
        type: Number,
        required: false,
        min: [0, 'Product price cannot be negative!'],
        default: 0.00
    },
    description: {
        type: String,
        required: [true, 'Product must have a description'],
        trim: true,
    },
    images: [{
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true
        }
    }],
    category: {
        type: String,
        required: [true, 'Product must be in a category'],
        enum: {
            values: [
                'Cameras',
                'Laptops',
                'Electronics',
                'Accessories',
                'Food',
                'Books',
                'Clothes&Shoes',
                'Sports',
                'Outdoor',
                'Indoor'
            ],
            message: 'Please select the correct categorty for the product'
        }
    },
    stock: {
        type: Number,
        required: [true, 'Please enter product stock count'],
        max: [10000, 'Products stock cannot be longer that 5 characters'],
        min: [0, 'Products stock cannot be negative'],
        default: 0
    },
    quantity: {
        type: Number,
        required: [true, 'Please enter product quantity'],
        max: [500, 'Products quantity cannot be longer that 500'],
        min: [0, 'Products quantity cannot be negative'],
        default: 1
    },
    user: {
        type: Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }],
    status: {
        type: String,
        default: 'Pending',
        enum: {
            values: ['Active', 'Pending', 'Sold Out'],
            message: 'Please select the correct status for the product'
        }
    },
    sold: {
        type: Number,
        default: 0
    }
}, { timestamps: true })


//Middleware to delete reviews related to the product when the product is deleted
productSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

productSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        doc.images.map(async ({ public_id, url }) => {
            await cloudinary.uploader.destroy(public_id)
        })
    }
})

const Product = model('Product', productSchema)

export default Product