"use strict"
/* --------------------- DB CONNECTION --------------- */

const mongoose = require('mongoose')

const dbConnection = function () {
    mongoose.connect(process.env.MONGODB)
        .then(() => console.log("* DB Connect *"))
        .catch((err) => console.log("* DB Not Connect *", err))
}

module.exports = {
    mongoose,
    dbConnection
}