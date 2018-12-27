const mongoose = require('mongoose')
const Schema = mongoose.Schema
var Int32 = require('mongoose-int32');

const xdkModel = new Schema ({

    name: {
        type: String,
        minlength: 2,
        maxlength: 30
    },
    timestamp: {
        type: Date,
    },
    id: {
        type: Number,
        minlength: 2,
        maxlength: 30
    },
    temperature: {
        type: Int32,
    },
    Humidity: {
        type: Int32,
    },
    Pressure: {
        type: Int32,
    },
    AccelerometerX: {
        type: Int32,
    },
    AccelerometerY: {
        type: Int32,
    },
    AccelerometerZ: {
        type: Int32,
    },
    gyroscopeX: {
        type: Int32,
    },
    gyroscopeY: {
        type: Int32,
    },
    gyroscopeZ: {
        type: Int32,
    },
    MagnetometerX: {
        type: Int32,
    },
    MagnetometerY: {
        type: Int32,
    },
    MagnetometerZ: {
        type: Int32,
    },
    Noise: {
        type: Int32,
    },
    Light: {
        type: Int32,
    },
    Magnitude: {
        type: Int32,
    }
});

module.exports = mongoose.model('XDK', xdkModel, 'XDK');