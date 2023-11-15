import { Schema, model } from 'mongoose'
import cloudinary from '../utils/cloudinary.js'

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
    description: {
        type: String,
        required: [true, 'Product must have a description'],
        trim: true,
    },
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
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
            values: ['Electronics',
                'Cameras',
                'Laptops',
                'Accessories',
                'Headphones',
                'Food',
                'Books',
                'Clothes/Shoes',
                'Sports',
                'Outdoor',
                'Home'
            ],
            message: 'Please select the correct categorty for the product'
        }
    },
    seller: {
        type: String,
        required: [true, 'Please enter product seller']
    },
    stock: {
        type: Number,
        required: [true, 'Please enter product stock count'],
        maxlength: [5, 'Products stock cannot be longer that 5 characters'],
        minlength: [0, 'Products stock cannot be negative'],
        default: 0
    },
    user: {
        type: Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    reviews: [{
        rating: {
            type: Number,
            required: [true, 'Rating must be provided'],
            min: [1, 'Rating must be atleas 1'],
            max: [5, 'Rating must be atleas 1']
        },
        body: {
            type: String,
            required: [true, 'Review must be provided']
        },
        user: { type: Schema.Types.ObjectId, ref: 'User' }
    }]
}, { timestamps: true })


productSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        doc.images.map(async ({ public_id, url }) => {
            await cloudinary.uploader.destroy(public_id)
        })
    }
})

const Product = model('Product', productSchema)

export default Product