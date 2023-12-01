"use strict"
/* -------------------- PASSENGER MODEL -------------- */

const { mongoose } = require('../config/dbConnection')
/* 
------- PASSENGER EXAMPLE DATA -------
{
    "firstName": "firstname 1",
    "lastName": "lastname",
    "gender": "M",
    "email": firstname1@site.com",
    "createdId": "65648b35a0ec376a7e5b1dfc",

}
*/
const passangerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        required: true,
    },
    lastName: {
        type: String,
        trim: true,
        required: true,
    },
    gender: {
        type: String,
        enum: [null, 'F', 'M'],
        default: null
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true, // default, unique: false
        validate: [
            (email) => {
                const emailRegexCheck = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
                return emailRegexCheck.test(email)
            },
            'Email type is not correct'
        ]
    },
    createdId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },



}, { collection: 'passengers', timestamps: true })

module.exports = mongoose.model('Passenger', passangerSchema)