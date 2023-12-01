"use strict"
/* ------------------- FLIGHT MODEL ------------------ */

const { mongoose } = require('../config/dbConnection')

/* 
------- FLIGHT EXAMPLE DATA -------

{
    "flightNumber": "IS-AN-001",
    "airline": "THY",
    "departure": "ISTANBUL",
    "departureDate": "2020-10-01 10:00:00",
    "arrival": "ANKARA",
    "arrivalDate": "2020-10-01 12:00:00",
    "createdId": "65648b35a0ec376a7e5b1dfc"
}

*/

const flightSchema = new mongoose.Schema({
    flightNumber: { // IS-AN-005
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    airline: {
        type: String,
        trim: true,
        required: true
    },
    departure: {
        type: String,
        trim: true,
        required: true,
    },
    departureDate: {
        type: Date,
        required: true
    },
    arrival: {
        type: String,
        trim: true,
        required: true,

    },
    arrivalDate: {
        type: Date,
        required: true
    },
    createdId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { collection: 'flights', timestamps: true })

//! Trigger: When running init.

const dateToLocalString = require('../helpers/dateToLocalString')

//? req sorgusu yapılınca ekrana veri basılmadan hemen önce çalışacak kod bloğu. DB'de herhangi bir değişikliğe neden olmaz.
//? Validasyon işlemleri genellikle pre-init bloklarında (middlewares'lerde) yapılır.
flightSchema.pre('init', function (document) {
    //? Mongoose'daki DB'de her satır (veri) bir document olduğu için fonksiyn içi document yazıldı.
    // document.departureDateStr = document.departureDate.dateToLocaleString('tr-tr', {dateStyle: 'full', timeStyle:'medium'})
    // document.arrivalDateStr = document.arrivalDate.dateToLocaleString('tr-tr', {dateStyle: 'full', timeStyle:'medium'})
    document.departureDateStr = dateToLocalString(document.departureDate)
    document.arrivalDateStr = dateToLocalString(document.arrivalDate)
    document.__v = undefined // res cevabında ekrana mongoose DB'deki her kayıt için  (__v) field'ı ekler.
})

module.exports = mongoose.model('Flight', flightSchema)