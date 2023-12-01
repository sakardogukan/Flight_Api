"use strict"
/* --------------------- AUTHENTICATION -------------- */

const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const auth = req.headers?.authorization || null
    const accessToken = auth ? auth.split(' ')[1] : null

    jwt.verify(accessToken, process.env.ACCESS_KEY, (err, userData) => req.user = userData)

    //! Add createdId for all req.body
    req.body.createdId = req.user?._id
    // console.log(req.body);
    // console.log(req.user);
    next()
}