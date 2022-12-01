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

const myDb = mongoose.connection.useDb('subscriptions');
const Subscription = myDb.model('Subscription', subscriptionSchema);
module.exports = Subscription;