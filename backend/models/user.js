import bcrypt from 'bcryptjs'
import { Schema, model } from 'mongoose'
import validator from 'validator'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import cloudinary from '../utils/cloudinary.js'

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "User must have a username"],
        unique: true,
        minlength: [2, 'Username cannot be less than 2 characters'],
        maxlength: [15, 'Username cannot exceed 15 characters']
    },
    email: {
        type: String,
        required: [true, 'User must have an email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        minlength: [8, 'Password must be atleast 8 characters'],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: 'user'
    },
    address: {
        country: {
            type: String,
        },
        city: {
            type: String,
        },
        streetname: {
            type: String,
        },
        postalCode: {
            type: String,
        }
    },

}, { timestamps: true })

// Encrypting password om pre

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }

    this.password = await bcrypt.hash(this.password, parseInt(process.env.SALT_ROUND))
})

userSchema.methods.genJwtoken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: '120m'
    })
}

//compare user password

userSchema.methods.comparePasswords = async function (password) {
    return await bcrypt.compare(password, this.password)
}

// generate password reset token
userSchema.methods.getResetPasswordToken = function () {
    //generate token
    const resetToken = crypto.randomBytes(20).toString('hex')

    //hash and set resetPasswordToken
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')

    // set expire time
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000

    return resetToken
}

userSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await cloudinary.uploader.destroy(doc.avatar.public_id)
    }
})

const User = model('User', userSchema)

export default User