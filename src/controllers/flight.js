"use strict"
/* --------------------- FLIGHT CONTROLLER ------------- */

const Flight = require('../models/flight')

module.exports = {
    list: async (req, res) => {
        /*
            #swagger.tags = ['Flights']
            #swagger.summary = 'List Flights'
            #swagger.description = `
                You can send query with endpoint for search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL?<b>page=2&limit=1</b></li>
            `
        */

        const data = await res.getModelList(Flight)
        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(Flight),
            data
        })

    },
    create: async (req, res) => {
        /*
            #swagger.tags = ['Flights']
            #swagger.summary = 'Create a Flight'
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {                    
                    "flightNumber": "IS-AN-005",
                    "airline": "THY",
                    "departure": "ISTANBUL",
                    "departureDate": "2020-10-01 10:00:00",
                    "arrival": "ANKARA",
                    "arrivalDate": "2020-10-01 12:00:00"
                }
            }
        */
        const data = await Flight.create(req.body)
        res.status(201).send({
            error: false,
            data
        })
    },
    read: async (req, res) => {
        /*
            #swagger.tags = ['Flights']
            #swagger.summary = 'Get single flight'
            #swagger.description = `
                A record containing "flightID" is called up.
                <ul> Examples:
                    <li> URL/<b>flightId</b></li>
                </ul>
            `
        */
        const data = await Flight.findOne({ _id: req.params.id })
        res.status(200).send({
            error: false,
            data
        })
    },
    update: async (req, res) => {
        /*
            #swagger.tags = ['Flights']
            #swagger.summary = 'Update a Flight'
            #swagger.description = `
            A record containing "FlightID" is called up. Then, the update is made with the values ​​in the "body".
            <ul> Examples:
                <li> URL/<b>flightId</b></li>
            </ul>
            `
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {                    
                    "flightNumber": "IS-AN-005",
                    "airline": "THY",
                    "departure": "ISTANBUL",
                    "departureDate": "2020-10-01 10:00:00",
                    "arrival": "ANKARA",
                    "arrivalDate": "2020-10-01 12:00:00"
                }
            }  
        */
        const data = await Flight.updateOne({ _id: req.params.id }, req.body, { runValidators: true })
        res.status(202).send({
            error: false,
            data,
            newData: await Flight.findOne({ _id: req.params.id })
        })
    },
    delete: async (req, res) => {
        /*
           #swagger.tags = ['Flights']
           #swagger.summary = 'Delete a Flight'
           #swagger.description = `
               <ul> Examples:
                   <li> URL/<b>flightId</b></li>
               </ul>
           `
       */
        const data = await Flight.deleteOne({ _id: req.params.id })
        res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
            data
        })
    }
    
}