const mongoose = require('mongoose')
const Xdk = require('../models/xdk')
const virtualSensors = require('../models/xdk_virtualsensors')

module.exports = [

    { //POST /xdk/sensors
    method: 'POST',
    path: '/xdk/{name}/sensors',
    handler: async (request, h) => {

        const sensors = {
            timestamp: new Date(request.payload.timestamp),
            name: request.params.name,
            temperature: request.payload.temperature,
            Pressure: request.payload.pressure,
            Humidity: request.payload.humidity,
            Magnitude: request.payload.magnitude
            }


        if (request.payload.timestamp === "2018-12-16T19:45:00.633Z") {
            sensors.timestamp = Date.now()
        }

        return Xdk.create(sensors).then((response) => {
            console.log(response)
            return h.response({
                success: true,
                response: {
                    message: 'SUCCESFULLY CREATED',
                sensors: sensors
                }

            })


        }).catch((err) => {
            return h.response({
                success: false,
                response: 'TRY AGAIN'
            })
        })

    }
    },
    { //POST /xdk/virtualsensors
    method: 'POST',
    path: '/xdk/{name}/virtualsensors',
    handler: async (request, h) => {
        
        console.log(request.payload)

        const virtualsensors = {
            timestamp: Date.now(),
            name: request.params.name,
            quatW: parseFloat(request.payload.w),
            quatX: parseFloat(request.payload.x),
            quatY: parseFloat(request.payload.y),
            quatZ: parseFloat(request.payload.z)
            }
        //console.log(typeof parseFloat(virtualsensors.quatW))
        console.log(virtualsensors)

      //  if (request.payload.timestamp === "2018-12-16T19:45:00.633Z") {
        //    virtualsensors.timestamp = Date.now()
       // }

        return virtualSensors.create(virtualsensors).then((response) => {
            console.log(`response   ${response}`)
            return h.response({
                success: true,
                response: {
                    message: 'SUCCESFULLY CREATED'
                }
            }).code(200)

        }).catch((err) => {
            console.log(`error ${err}`)
            return h.response({
                success: false,
                response: 'TRY AGAIN'
            })
        })

    }
    },
    { //GET /xdk/sensors
    method: 'GET',
    path: '/xdk/sensors/{name}',
    handler: async (request, h) => {
        let name = request.params.name
        console.log(name)
        let sensors = await Xdk.find({ name: name }).exec()

        if (sensors) {
            return h.response({
                success: true,
                response: {
                    message: "succesfully find it",
                    sensors: sensors
                }
            })
        } else {
            return h.response({
                success: false,
                response: "Not found"
            })
        }
    }
    },
    { //GET /xdk/sensors
    method: 'GET',
    path: '/xdk/sensors/{initialtimestamp}/{endtimestamp}',
    handler: async (request, h) => {
        let init = request.params.initialtimestamp
        let end = request.params.endtimestamp
        
        console.log(init)

        console.log(end)

        const sensors = await Xdk.find({ timestamp: { $gt: init , $lt: end, } }).exec()

        if (sensors) {
            return h.response({
                success: true,
                response: {
                    message: "succesfully find it",
                    sensors: sensors
                }
            })
        } else {
            return h.response({
                success: false,
                response: "Not found"
            })
        }
    }
    },
    { //GET /xdk/sensors
        method: 'GET',
        path: '/xdk/virtualsensors/{name}',
        handler: async (request, h) => {
            let name = request.params.name
            console.log(name)
            let sensors = await virtualSensors.find().limit(1).sort({ "_id": -1 }).exec()
    
            if (sensors) {
                return h.response({
                    success: true,
                    response: {
                        message: "succesfully find it",
                        sensors: sensors
                    }
                })
            } else {
                return h.response({
                    success: false,
                    response: "Not found"
                })
            }
        }
    },
    { //DELETE /xdk/sensors
    method: 'DELETE',
    path: '/xdk/sensors',
    handler: async (request, h) => {
        
    }
    }

]