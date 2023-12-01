"use strict"
/* --------------------- SWAGGER DOC ----------------- */

require('dotenv').config()
const HOST = process.env?.HOST || '127.0.0.1'
const PORT = process.env?.PORT || 8000

const swaggerAutogen = require('swagger-autogen')()
const packageJson = require('./package.json')

const document = {
    info: {
        version: packageJson.version,
        title: packageJson.title,
        description: packageJson.description,
        termsOfService: 'http://localhost',
        contact: { name: packageJson.name, email: packageJson.email },
        license: { name: packageJson.license }
    },
    host: `${HOST}:${PORT}`,
    basePath: '/',
    schemes: ['http', 'https'],

    //! JWT Settings:
    securityDefinitions: {
        JWT: {
            type: 'apiKey',
            in: 'header',
            name: 'Authorization',
            description: 'Enter Your AccessToken (JWT) for Login. Example: <b>Bearer <i>...accessToken...</b></b>'
        }
    },
    security: [{ 'JWT': true }],

    definition: {
        '/auth/login': {
            username: {
                type: 'String',
                required: true
            },
            password: {
                type: 'String',
                required: true
            },
        },
        '/auth/refresh': {
            'token.refresh': {
                description: '{token: {refresh: ...}}',
                type: 'String',
                required: true
            }
        },

        //! Swagger Model Area:
        'User': require('./src/models/user').schema.obj,
        'Flight': require('./src/models/flight').schema.obj,
        'Passenger': require('./src/models/passenger').schema.obj,
        'Reservation': require('./src/models/reservation').schema.obj,
    }

}

const routes = ['./index.js']
const outputFile = './src/config/swagger.json'
swaggerAutogen(outputFile, routes, document)