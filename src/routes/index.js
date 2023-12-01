"use strict"
/* --------------------- INDEX ROUTES ----------------- */

const router = require('express').Router()

//? auth:
router.use('/auth', require('./auth'))

//? user:
router.use('/users', require('./user'))

//? flight:
router.use('/flights', require('./flight'))

//? passenger:
router.use('/passengers', require('./passenger'))

//? rezervation:
router.use('/reservations', require('./reservation'))

//? document:
router.use('/documents', require('./document'))

module.exports = router