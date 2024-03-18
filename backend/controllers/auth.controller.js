import * as statusCodes from '../constants/status.constants.js';
import User from "../models/user.js";
import cloudinary from '../utils/cloudinary.js';
import sendToken from "../utils/jwtTokenCookie.js";
import ResponseError from "../utils/responseerror.js";

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


    req.user = user;
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
    const { oldPassword, newPassword, confirmPassword } = req.body
    if (!oldPassword || !newPassword || !confirmPassword) {
        return next(
            new ResponseError(
                "Enter all required fields",
                statusCodes.BAD_REQUEST
            )
        )
    }
    const user = await User.findById(req.user._id).select('+password')

    const validOldPassword = await user.comparePasswords(oldPassword)
    if (!validOldPassword) {
        return next(
            new ResponseError(
                "Password is invalid",
                statusCodes.BAD_REQUEST
            )
        )
    }

    if (newPassword != confirmPassword) {
        return next(
            new ResponseError(
                "Passwords do not match",
                statusCodes.BAD_REQUEST
            )
        )
    }

    // return error if the old password is the same as the new password
    if (oldPassword == newPassword) {
        return next(
            new ResponseError(
                "Old password and new password cannot be the same",
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
    const { username, email, address, phone } = req.body;
    const { file } = req
    if (!username || !email) {
        return next(
            new ResponseError(
                "username and email must be provided",
                statusCodes.BAD_REQUEST
            )
        )
    }


    const newUser = {
        username,
        email,
    }


    let avatar = { url: "", public_id: "" }
    if (file) {
        const { path } = file
        const { secure_url, public_id } = await cloudinary.uploader.upload(path, {
            folder: process.env.CLOUDINARY_AVATARS_FOLDER
        });
        avatar = { url: secure_url, public_id }
        newUser.avatar = avatar
    }

    if (address) {
        newUser.address = address
    }


    await User.findByIdAndUpdate(req.user._id, newUser, {
        new: true,
        runValidators: true,
    })

    res.status(statusCodes.OK).json({
        message: "User updated"
    })
}

export const deleteOwnProfile = async (req, res, next) => {
    const user = await User.findById(req.user._id)
    if (!user) {
        return next(
            new ResponseError(
                "User not found",
                statusCodes.NOT_FOUND
            )
        )
    }

    await User.findByIdAndDelete(req.user._id)

    res.status(statusCodes.OK).json({
        message: "User deleted"
    })
}

//Get own role
// /api/auth/me/role
export const getRole = async (req, res, next) => {
    const user = await User.findById(req.user._id)
    res.status(statusCodes.OK).json({
        role: user.role
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
    const user = await User.findById(userId)
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