const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subscriptionSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);
module.exports = Subscription;