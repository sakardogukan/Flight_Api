"use strict"
/* -------------------- PERMISSIONS ------------------ */

module.exports = {

    isLogin: (req, res, next) => {
        
        if(process.env.NODE_ENV == 'development') return next()

        if (req.user) {
            next()
        } else {
            res.errorStatusCode = 401
            throw new Error('No permission: You must login')
        }
    },
    isStaffOrAdmin: (req, res, next) => {

        if(process.env.NODE_ENV == 'development') return next()

        if (req.user && (req.user.isStaff || req.user.isAdmin)) {
            next()
        } else {
            res.errorStatusCode = 403
            throw new Error('No permission: You must login and to be staff')
        }
    },
    isAdmin: (req, res, next) => {

        if(process.env.NODE_ENV == 'development') return next()

        if (req.user && req.user.isAdmin) {
            next()
        } else {
            res.errorStatusCode = 403
            throw new Error('No permission. You must login and to be admin')
        }
    },

}