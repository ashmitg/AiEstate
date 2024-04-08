const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customSchema = new Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    assets: {
        cars: [{ type: Schema.Types.ObjectId, ref: 'carasset' }],
        houses: [{ type: Schema.Types.ObjectId, ref: 'propertyasset' }],
        stocks: [{ type: Schema.Types.ObjectId, ref: 'stockasset' }],
        businesses: [{ type: Schema.Types.ObjectId, ref: 'businessasset' }],
        customs: [{ type: Schema.Types.ObjectId, ref: 'customasset' }]
    }
});

module.exports = mongoose.model('assets', customSchema);
