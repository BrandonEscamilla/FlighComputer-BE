const mongoose = require('mongoose')
const Schema = mongoose.Schema
var Int32 = require('mongoose-int32');

const virtualSensors = new Schema ({
    name: {
        type: String,
        minlength: 2,
        maxlength: 30
    },
    timestamp: {
        type: Date,
    },
    quatW: {
        type: Number,
    },
    quatX: {
        type: Number,
    },
    quatY: {
        type: Number,
    },
    quatZ: {
        type: Number,
    },
});

module.exports = mongoose.model('virtualSensors', virtualSensors, 'virtualSensors');