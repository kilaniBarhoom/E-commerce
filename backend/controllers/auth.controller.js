import User from "../models/user.js";
import * as statusCodes from '../constants/status.constants.js'
import ResponseError from "../utils/responseerror.js";
import sendToken from "../utils/jwtTokenCookie.js";
import cloudinary from '../utils/cloudinary.js'
import crypto from 'crypto'

// /api/auth/signup
export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return next(
            new ResponseError(
                "Enter all required fields",
                statusCodes.BAD_REQUEST
            )
        )
    }

    const user = await User.create({
        username,
        email,
        password,
        avatar: {
            public_id: "z/default-avatar-profile-icon-vector-user-image-179582665",
            url: "https://thumbs.dreamstime.com/z/default-avatar-profile-icon-vector-user-image-179582665.jpg"
        }
    })


    sendToken(user, statusCodes.CREATED, res)

}

// /api/auth/login
export const login = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(
            new ResponseError(
                "Enter all required fields",
                statusCodes.BAD_REQUEST
            )
        )
    }

    const user = await User.findOne({ email }).select('+password')

    if (!user) {
        return next(
            new ResponseError(
                "Invalid email or password!",
                statusCodes.NOT_AUTHENTICATED
            )
        )
    }

    const isPasswordValid = await user.comparePasswords(password)

    if (!isPasswordValid) {
        return next(
            new ResponseError(
                "Invalid email or password!",
                statusCodes.NOT_AUTHENTICATED
            )
        )
    }

    sendToken(user, statusCodes.OK, res)


}

// /api/auth/logout
export const logout = async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(statusCodes.OK).json({
        message: "Logged out"
    })
}

// /api/auth/update-password
export const updatePassword = async (req, res, next) => {
    const { currentPassword, newPassword, confirmNewPassword } = req.body
    if (!currentPassword || !newPassword || !confirmNewPassword) {
        return next(
            new ResponseError(
                "Enter all required fields",
                statusCodes.BAD_REQUEST
            )
        )
    }
    const user = await User.findById(req.user._id).select('+password')

    const validOldPassword = await user.comparePasswords(currentPassword)
    if (!validOldPassword) {
        return next(
            new ResponseError(
                "Password is invalid",
                statusCodes.BAD_REQUEST
            )
        )
    }

    if (newPassword != confirmNewPassword) {
        return next(
            new ResponseError(
                "Passwords does not match",
                statusCodes.BAD_REQUEST
            )
        )
    }

    user.password = newPassword;
    await user.save()
    sendToken(user, statusCodes.OK, res)
}

// /api/auth/me
export const getOwnProfile = async (req, res, next) => {
    const user = await User.findById(req.user._id)

    res.status(statusCodes.OK).json({
        user
    })
}
export const updateOwnProfile = async (req, res, next) => {
    const { username, email } = req.body;
    const { file } = req
    if (!username || !email) {
        return next(
            new ResponseError(
                "username and email must be provided",
                statusCodes.BAD_REQUEST
            )
        )
    }
    let avatar = {
        url: "https://thumbs.dreamstime.com/z/default-avatar-profile-icon-vector-user-image-179582665.jpg",
        public_id: `z/default-avatar-profile-icon-vector-user-image-179582665${crypto.randomBytes(6).toString('hex')}`
    }
    if (file) {
        const { path } = file
        const { secure_url, public_id } = await cloudinary.uploader.upload(path, {
            folder: process.env.CLOUDINARY_AVATARS_FOLDER
        });
        avatar = { url: secure_url, public_id }
    }



    const newUser = {
        username,
        email,
        avatar
    }
    await User.findByIdAndUpdate(req.user._id, newUser, {
        new: true,
        runValidators: true,
    })

    res.status(statusCodes.OK).json({
        message: "User updated"
    })
}

// ADMIN ROUTES

// /api/auth/admin/users
export const getAll = async (req, res, next) => {
    const users = await User.find({})
    res.status(statusCodes.OK).json({
        users
    })

}

// /api/auth/admin/users/:userId
export const getOneUser = async (req, res, next) => {
    const userId = req.params.userId
    const users = await User.findById(userId)
    if (!user) {
        return next(
            new ResponseError(
                "User not found",
                statusCodes.NOT_FOUND
            )
        )
    }

    res.status(statusCodes.OK).json({
        user
    })

}
export const updateOneUser = async (req, res, next) => {
    const { username, email, role } = req.body
    if (!username || !email || !role) {
        return next(
            new ResponseError(
                "Enter all required fields",
                statusCodes.BAD_REQUEST
            )
        )
    }
    const newData = {
        username,
        email,
        role
    }
    const userId = req.params.userId
    const user = await User.findById(userId)
    if (!user) {
        return next(
            new ResponseError(
                "User may be deleted",
                statusCodes.BAD_REQUEST
            )
        )
    }

    await User.findByIdAndUpdate(userId, newData, {
        new: true,
        runValidators: true,
        useFindByIdAndModify: false
    })

    res.status(statusCodes.OK).json({
        message: "User updated"
    })

}
export const deleteOneUser = async (req, res, next) => {

    const userId = req.params.userId
    const user = await User.findById(userId)
    if (!user) {
        return next(
            new ResponseError(
                "User may be deleted",
                statusCodes.BAD_REQUEST
            )
        )
    }

    await User.findByIdAndDelete(userId)

    res.status(statusCodes.OK).json({
        message: "User deleted"
    })

}