const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    subscriptionTier : {
        type: String,
        required: true
    },
    dp: {
        type: String,
        required: false
    }
});

const myDb = mongoose.connection.useDb('users');
const User = myDb.model('User', userSchema);
module.exports = User;