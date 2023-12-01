"use strict"
/* --------------------- SYNCHORIZATION -------------- */

module.exports = async function () {
    //Remove DB:
    const { mongoose } = require('../config/dbConnection')
    await mongoose.connection.dropDatabase()
    console.log('- Database and all data deleted !')
}