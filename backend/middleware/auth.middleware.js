// Check if user is authorised to do an action or not

import { NOT_AUTHENTICATED, NOT_AUTHORIZED, NOT_FOUND } from "../constants/status.constants.js"
import User from "../models/user.js"
import ResponseError from "../utils/responseerror.js"
import jwt from 'jsonwebtoken'

//use asynchandler

export const auth = async (req, res, next) => {
    const { token } = req.cookies
    if (!token) {
        return next(
            new ResponseError(
                "Login first",
                NOT_AUTHENTICATED
            )
        )
    }

    //verify if the user is authorized
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decoded.id);
        if (!req.user) {
            return next(
                new ResponseError(
                    "User account was deleted",
                    NOT_FOUND
                )
            )
        }
        next();
    } catch (error) {
        next(
            new ResponseError(
                "Not Authorized",
                NOT_AUTHORIZED
            )
        )
    }


}

export const hasRole = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ResponseError(
                "You have no access to this resource",
                NOT_AUTHORIZED
            ))
        }
        next()
    }
}