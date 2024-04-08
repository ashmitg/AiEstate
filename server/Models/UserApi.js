const mongoose = require("mongoose");

const userApi = new mongoose.Schema({
    apiKey: {
        type: String,
        required: false,
        default: ""
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
      },
    dateOf: {
        type: Date,
        default: new Date()
    }
});
module.exports = mongoose.model("userapi", userApi);