"use strict"
/* ---------------- PASSENGER CONTROLLER ------------- */

const Passenger = require('../models/passenger')
    
module.exports = {
    list: async (req, res) => {
        /*
            #swagger.tags = ['Passengers']
            #swagger.summary = 'List Passengers'
            #swagger.description = `
                You can send query with endpoint for search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL?<b>page=2&limit=1</b></li>
            `
        */

        const data = await res.getModelList(Passenger)
        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(Passenger),
            data
        })

    },
    create: async (req, res) => {
        /*
            #swagger.tags = ['Passengers']
            #swagger.summary = 'Create a Passenger'
            #swagger.description = 'See the example below to add a record.'
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {                    
                    "firstName": "test",
                    "lastName": "test",
                    "gender": "M",
                    "email": "test@test.com"
                }
            }            
        */

        // req.body.createdId = req.user?._id
        
        const data = await Passenger.create(req.body)
        res.status(201).send({
            error: false,
            data
        })
    },
    read: async (req, res) => {
        /*
            #swagger.tags = ['Passengers']
            #swagger.summary = 'Get single Passenger'
            #swagger.description = `
                A record containing "passengerID" is called up.
                <ul> Examples:
                    <li> URL/<b>passengerId</b></li>
                </ul>
            `
        */
        const data = await Passenger.findOne({ _id: req.params.id })
        res.status(200).send({
            error: false,
            data
        })
    },
    update: async (req, res) => {
        /*
            #swagger.tags = ['Passengers']
            #swagger.summary = 'Update a Passenger'
            #swagger.description = `
            A record containing "passengerID" is called up. Then, the update is made with the values ​​in the "body".
            <ul> Examples:
                <li> URL/<b>passengerId</b></li>
            </ul>
            `
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {                    
                    "firstName": "test",
                    "lastName": "test",
                    "gender": "M",
                    "email": "test@test.com"
                }
            }  
        */
        const data = await Passenger.updateOne({ _id: req.params.id }, req.body, { runValidators: true })
        res.status(202).send({
            error: false,
            data,
            newData: await Passenger.findOne({ _id: req.params.id })
        })
    },
    delete: async (req, res) => {
        /*
           #swagger.tags = ['Passengers']
           #swagger.summary = 'Delete a Passenger'
           #swagger.description = `
               <ul> Examples:
                   <li> URL/<b>passengerId</b></li>
               </ul>
           `
       */
        const data = await Passenger.deleteOne({ _id: req.params.id })
        res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
            data
        })
    }
    
}