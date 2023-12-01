"use strict"
/* --------------------- INDEX.JS -------------------- */
//! Required Moduls:
const express = require('express')
const app = express()
require('dotenv').config()
const PORT = process.env?.PORT || 8000
const HOST = process.env?.HOST || '127.0.0.1'
// console.log(process.env.ACCESS_KEY)

//! asyncErrors to errorHandler:
require('express-async-errors')

/* --------------------------------------------------- */
//! Configuration:
//? Connect to DB:
const { dbConnection } = require('./src/config/dbConnection')
dbConnection()

//? Cors Settings:
var cors = require('cors')
app.use(cors())

/* --------------------------------------------------- */
//! Middlewares:
//? Accept to JSON:
app.use(express.json())

//? Check Authentication:
app.use(require('./src/middlewares/authentication'))

//? Run Logger:
app.use(require('./src/middlewares/logger'))

//? Searching&Sorting&Pagination:
app.use(require('./src/middlewares/findSearchSortPage'))

/* --------------------------------------------------- */
//! Routes:
//? Home Page:
// app.use('/')  -> URL'in sağındaki bütün path ler için geçerlidir. 
// app.all('/*') -> URL'in sağındaki bütün path ler için geçerlidir. 
// app.all('/')  -> URL'in sağında (*) olmadığı için sadece ana sayfa için geçerlidir.
app.all('/', (req, res) => {
    res.send({
        error: false,
        message: 'Welcome to FLIGHT RESERVATION API',
        documents: '/documents',
        user: req.user
    })
})

//? Routes Folder:
app.use(require('./src/routes/index.js'))
// app.use('/', require('./src/routes/index.js'))
/* --------------------------------------------------- */
//! asyncErrors to errorHandler:
app.use(require('./src/middlewares/errorHandler'))

//! Port listen:
app.listen(PORT, () => console.log(`Running: ${HOST}:${PORT}`))

//! Synchronization (must be in commentLine):
// require('./src/helpers/sync')()