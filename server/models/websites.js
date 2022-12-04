const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const websiteSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    articlesArray : { type : Array , "default" : [] }
});

const myDb = mongoose.connection.useDb('websites');
const Website = myDb.model('Website', websiteSchema);
module.exports = Website;