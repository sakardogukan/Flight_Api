"use strict"
/* --------------------- USER MODEL ------------------ */

const { mongoose } = require('../config/dbConnection')
const passwordEncrypt = require('../helpers/passwordEncrypt')
/* 
------- USER EXAMPLE DATA -------
{
    "username": "normal",
    "password": "1234",
    "email": "normal@site.com",
    "isActive": true,
    "isStaff": false,
    "isAdmin": false
    
    "username": "staff",
    "password": "1234",
    "email": "staff@site.com",
    "isActive": true,
    "isStaff": true,
    "isAdmin": false
    
    "username": "admin",
    "password": "1234",
    "email": "admin@site.com",
    "isActive": true,
    "isStaff": false,
    "isAdmin": true
}
*/

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        trim: true,
        required: true,
        unique: false,
        set: (password) => passwordEncrypt(password)
    },
    email: {
        type: String,
        trim: true,
        required:true,
        unique:true,
        validate: [
            (email) => {
                const emailRegexCheck = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
                return emailRegexCheck.test(email)
            },
            'Email type is not correct'
        ]
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isStaff: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, { collection: 'users', timestamps: true })

module.exports = mongoose.model('User', UserSchema)