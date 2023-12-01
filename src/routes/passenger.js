"use strict"
/* -------------------- PASSENGER ROUTE -------------- */

const router = require('express').Router()
const {isStaffOrAdmin} = require('../middlewares/permissions')
const passenger = require('../controllers/passenger')

router.use(isStaffOrAdmin)

router.route('/')
    .get(passenger.list)
    .post(passenger.create)

router.route('/:id')
    .get(passenger.read)
    .put(passenger.update)
    .patch(passenger.update)
    .delete(passenger.delete)

module.exports = router