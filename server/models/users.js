const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userToken : {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    subscriptionTier : {
        type: Number,
        required: true,
        default: 1
    },
    dp: {
        type: String,
        required: false
    },
    websites: {
        type: Array,
        required: false
    }
});

const myDb = mongoose.connection.useDb('users');
const User = myDb.model('User', userSchema);
module.exports = User;