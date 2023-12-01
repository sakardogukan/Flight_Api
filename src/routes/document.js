"use strict"
/* ------------------- DOCUMENT ROUTE ---------------- */

const router = require('express').Router()

router.all('/', (req, res) => {
    res.send({
        swagger: "/documents/swagger",
        redoc: "/documents/redoc",
        json: "/documents/json",
    })
})

//? JSON Doc:
router.use('/json', (req, res) => {
    res.sendFile('./src/configs/swagger.json', { root: '.' })
})

//? Swagger Doc:
const swaggerUi = require('swagger-ui-express')
router.use('/swagger', swaggerUi.serve, swaggerUi.setup(require('../config/swagger.json'), { swaggerOptions: { persistAuthorization: true } }))

//? Redoc Doc:
const redoc = require('redoc-express')
router.use('/redoc', redoc({
    spaceUrl: '/documents/redoc',
    title: 'Flight API',
}))

module.exports = router