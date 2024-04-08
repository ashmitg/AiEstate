const mongoose = require('mongoose')

const houseAsset = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    Assignment: {
        type: String,
        required: true,
    },
    Value: {
        type: Number,
        required: true
    },
    OptString: {
        type: String,
        required: false,
        default: ''
    }

});

module.exports = mongoose.model('propertyasset', houseAsset);