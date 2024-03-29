const sendToken = (user, statusCode, res) => {

    const token = user.genJwtoken()
    //cookie opts
    const options = {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRE_TIME * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
    }
    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        user
    })

}

export default sendToken